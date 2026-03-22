import { randomUUID } from "expo-crypto";
import type { Expense } from "../../types";
import { db } from "../db/sqlite";

const toExpense = (r: any): Expense => ({
  id: r.id,
  description: r.description,
  amount: r.amount,
  isChecked: !!r.is_checked,
  category: r.category ?? null,
  folderId: r.folder_id ?? null,
  createdAt: r.created_at,
  updatedAt: r.updated_at,
  deletedAt: r.deleted_at ?? null,
});

function getMonthRange(year: number, month: number) {
  const start = new Date(year, month - 1, 1).getTime();
  const end = new Date(year, month, 1).getTime();
  return { start, end };
}

export const expensesRepo = {
  listAll(): Expense[] {
    const rows = db.getAllSync(
      `SELECT * FROM expenses
       WHERE deleted_at IS NULL
       ORDER BY created_at DESC;`,
    );
    return rows.map(toExpense);
  },

  listByMonth(year: number, month: number): Expense[] {
    const { start, end } = getMonthRange(year, month);

    const rows = db.getAllSync(
      `SELECT * FROM expenses
       WHERE deleted_at IS NULL
         AND created_at >= ?
         AND created_at < ?
       ORDER BY created_at DESC;`,
      [start, end],
    );

    return rows.map(toExpense);
  },

  listByFolder(folderId: string): Expense[] {
    const rows = db.getAllSync(
      `SELECT * FROM expenses
       WHERE deleted_at IS NULL
         AND folder_id = ?
       ORDER BY created_at DESC;`,
      [folderId],
    );
    return rows.map(toExpense);
  },

  create(input: {
    description: string;
    amount: number;
    category?: string | null;
    folderId?: string | null;
  }): string {
    const id = randomUUID();
    const now = Date.now();

    db.runSync(
      `INSERT INTO expenses
       (id, description, amount, is_checked, category, folder_id, created_at, updated_at, deleted_at)
       VALUES (?, ?, ?, 0, ?, ?, ?, ?, NULL);`,
      [
        id,
        input.description.trim(),
        input.amount,
        input.category ?? null,
        input.folderId ?? null,
        now,
        now,
      ],
    );

    return id;
  },

  toggleChecked(id: string) {
    const now = Date.now();

    db.runSync(
      `UPDATE expenses
       SET is_checked = CASE is_checked WHEN 1 THEN 0 ELSE 1 END,
           updated_at = ?
       WHERE id = ? AND deleted_at IS NULL;`,
      [now, id],
    );
  },

  update(
    id: string,
    patch: Partial<{
      description: string;
      amount: number;
      category: string | null;
      folderId: string | null;
      isChecked: boolean;
    }>,
  ) {
    const sets: string[] = [];
    const args: any[] = [];
    const now = Date.now();

    if (patch.description !== undefined) {
      sets.push("description = ?");
      args.push(patch.description.trim());
    }
    if (patch.amount !== undefined) {
      sets.push("amount = ?");
      args.push(patch.amount);
    }
    if (patch.category !== undefined) {
      sets.push("category = ?");
      args.push(patch.category);
    }
    if (patch.folderId !== undefined) {
      sets.push("folder_id = ?");
      args.push(patch.folderId);
    }
    if (patch.isChecked !== undefined) {
      sets.push("is_checked = ?");
      args.push(patch.isChecked ? 1 : 0);
    }

    sets.push("updated_at = ?");
    args.push(now);
    args.push(id);

    db.runSync(
      `UPDATE expenses
       SET ${sets.join(", ")}
       WHERE id = ? AND deleted_at IS NULL;`,
      args,
    );
  },

  softDelete(id: string) {
    const now = Date.now();

    db.runSync(
      `UPDATE expenses
       SET deleted_at = ?, updated_at = ?
       WHERE id = ? AND deleted_at IS NULL;`,
      [now, now, id],
    );
  },
};
