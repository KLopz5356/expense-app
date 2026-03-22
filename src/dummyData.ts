import { Expense, User } from "./types";

const dummyUser: User = {
  id: "1",
  name: "John Doe",
  profilePicture: "https://avatar.example.com/johndoe.jpg",
  startedAt: new Date("2024-01-01"),
};

const dummyExpenses: Expense[] = [
  {
    id: "1",
    createdAt: new Date("2024-01-15").getTime(),
    description: "Grocery shopping",
    category: "Food",
    amount: 45.5,
    folderId: "123",
    isChecked: false,
    updatedAt: new Date("2024-01-15").getTime(),
    deletedAt: null,
  },
  {
    id: "2",
    createdAt: new Date("2024-01-16").getTime(),
    description: "Gas",
    category: "Transportation",
    amount: 60.0,
    folderId: "123",
    isChecked: false,
    updatedAt: new Date("2024-01-16").getTime(),
    deletedAt: null,
  },
  {
    id: "3",
    createdAt: new Date("2024-01-17").getTime(),
    description: "Netflix subscription",
    category: "Entertainment",
    amount: 15.99,
    folderId: "123",
    isChecked: false,
    updatedAt: new Date("2024-01-17").getTime(),
    deletedAt: null,
  },
  {
    id: "4",
    createdAt: new Date("2024-01-18").getTime(),
    description: "Electric bill",
    category: "Utilities",
    amount: 120.0,
    folderId: "123",
    isChecked: false,
    updatedAt: new Date("2024-01-18").getTime(),
    deletedAt: null,
  },
  {
    id: "5",
    createdAt: new Date("2024-01-19").getTime(),
    description: "Restaurant dinner",
    category: "Food",
    amount: 55.75,
    folderId: "123",
    isChecked: false,
    updatedAt: new Date("2024-01-19").getTime(),
    deletedAt: null,
  },
];

export { dummyExpenses, dummyUser };

