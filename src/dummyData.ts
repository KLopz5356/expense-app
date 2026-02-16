import { Expense, Folder, User } from "./types";

const dummyUser: User = {
  id: 1,
  name: "John Doe",
  profilePicture: "https://avatar.example.com/johndoe.jpg",
  startedAt: new Date("2024-01-01"),
};

const dummyExpenses: Expense[] = [
  {
    id: 1,
    createdAt: new Date("2024-01-15"),
    description: "Grocery shopping",
    category: "Food",
    amount: 45.5,
  },
  {
    id: 2,
    createdAt: new Date("2024-01-16"),
    description: "Gas",
    category: "Transportation",
    amount: 60.0,
  },
  {
    id: 3,
    createdAt: new Date("2024-01-17"),
    description: "Netflix subscription",
    category: "Entertainment",
    amount: 15.99,
  },
  {
    id: 4,
    createdAt: new Date("2024-01-18"),
    description: "Electric bill",
    category: "Utilities",
    amount: 120.0,
  },
  {
    id: 5,
    createdAt: new Date("2024-01-19"),
    description: "Restaurant dinner",
    category: "Food",
    amount: 55.75,
  },
];

const dummyFolder: Folder = {
  id: 1,
  createdAt: new Date("2024-01-01"),
  name: "Monthly Expenses",
  expenses: dummyExpenses,
};

export { dummyExpenses, dummyFolder, dummyUser };

