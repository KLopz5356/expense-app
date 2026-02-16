export type User = {
  id: number;
  name: string;
  profilePicture: string;
  startedAt: Date;
  // email: string;
  // password: string;
};

export type Expense = {
  id: number;
  createdAt: Date;
  description: string;
  category: string;
  amount: number;
};

export type Folder = {
  id: number;
  createdAt: Date;
  name: string;
  expenses: Expense[];
};
