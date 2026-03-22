export type User = {
  id: string;
  name: string;
  profilePicture: string;
  startedAt: Date;
  // email: string;
  // password: string;
};

export type Expense = {
  id: string;
  description: string;
  amount: number;
  isChecked: boolean;
  category: string;
  folderId: string | null;
  createdAt: number;
  updatedAt: number;
  deletedAt: number | null;
};

export type Folder = {
  id: string;
  name: string;
  type: string | null;
  createdAt: number;
  updatedAt: number;
  deletedAt: number | null;
};
