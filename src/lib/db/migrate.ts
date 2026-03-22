import { db } from "./sqlite";

export function migrate() {
  db.execSync("PRAGMA journal_mode = WAL;");

  db.execSync(`
    CREATE TABLE IF NOT EXISTS schema_migrations (
      id INTEGER PRIMARY KEY NOT NULL,
      name TEXT NOT NULL UNIQUE,
      applied_at INTEGER NOT NULL
    );
  `);

  const migrations: { name: string; sql: string }[] = [
    {
      name: "002_recreate_expenses_with_amount",
      sql: `
    DROP TABLE IF EXISTS expenses;

    CREATE TABLE IF NOT EXISTS expenses (
      id TEXT PRIMARY KEY NOT NULL,
      description TEXT NOT NULL,
      amount REAL NOT NULL,
      is_checked INTEGER NOT NULL DEFAULT 0,
      category TEXT,
      folder_id TEXT,
      created_at INTEGER NOT NULL,
      updated_at INTEGER NOT NULL,
      deleted_at INTEGER,
      FOREIGN KEY(folder_id) REFERENCES folders(id)
    );

    CREATE INDEX IF NOT EXISTS idx_expenses_created_at ON expenses(created_at);
    CREATE INDEX IF NOT EXISTS idx_expenses_deleted ON expenses(deleted_at);
    CREATE INDEX IF NOT EXISTS idx_expenses_folder ON expenses(folder_id);
  `,
    },
  ];

  const applied = new Set(
    db
      .getAllSync(`SELECT name FROM schema_migrations;`)
      .map((r: any) => r.name),
  );

  for (const m of migrations) {
    if (applied.has(m.name)) continue;

    db.execSync("BEGIN;");
    try {
      db.execSync(m.sql);
      db.runSync(
        `INSERT INTO schema_migrations (name, applied_at) VALUES (?, ?);`,
        [m.name, Date.now()],
      );
      db.execSync("COMMIT;");
    } catch (e) {
      db.execSync("ROLLBACK;");
      throw e;
    }
  }
}
