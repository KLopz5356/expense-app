import FolderExpenseScreen from "@/src/Components/expense-toggle-tab/folder-expense";
import MonthlyExpenseScreen from "@/src/Components/expense-toggle-tab/monthly-expense";
import React, { useEffect, useState } from "react";
import { Modal, Pressable, Text, TextInput, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Select, SelectOption } from "../../Components/Select";
import { expensesRepo } from "../../lib/repo/expensesRepo";
import type { Expense } from "../../types";

export default function ExpenseScreen() {
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth() + 1);
  const [items, setItems] = useState<Expense[]>([]);

  const reload = () => {
    setItems(expensesRepo.listByMonth(year, month));
  };

  useEffect(() => {
    reload();
  }, [year, month]);

  // States
  const [category, setCategory] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [tab, setTab] = useState<"Monthly" | "Folders">("Monthly");

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const categories: SelectOption[] = [
    { label: "Food", value: "food" },
    { label: "Bills", value: "bills" },
    { label: "Transpo", value: "transpo" },
    { label: "Shopee (oops)", value: "shopee" },
  ];

  const [expenseData, setExpenseData] = useState<Expense>({
    id: "",
    description: "",
    amount: 0,
    isChecked: false,
    category: "",
    folderId: "",
    createdAt: 0,
    updatedAt: 0,
    deletedAt: 0,
  });

  const handleDescriptionChange = (text: string) => {
    setExpenseData((prev) => ({
      ...prev,
      description: text,
    }));
  };

  const handleAmountChange = (text: string) => {
    setExpenseData((prev) => ({
      ...prev,
      amount: Number(text) || 0,
    }));
  };

  const handleAddExpense = () => {
    // create/add expense item
    expensesRepo.create({
      description: expenseData.description,
      amount: expenseData.amount,
      category: category,
      folderId: null,
    });

    setExpenseData((prev) => ({
      ...prev,
      description: "",
      amount: 0,
    }));

    setModalVisible(false);
    reload();
  };

  return (
    <>
      <View className="flex items-center p-4">
        {/* Back, Icon, Folder Name */}
        <View className="w-full pl-2">
          <View className="flex flex-row items-end gap-4">
            <Text className="text-white text-3xl font-semibold">Expenses</Text>
          </View>
        </View>

        {/* Switch Toggle */}
        <View className="flex-row bg-[#2D3442] rounded-xl w-full p-1 mt-4">
          {/* Toggle by Monthly */}
          <Pressable
            className={`rounded-xl flex-1 items-center justify-center py-3 ${tab === "Monthly" ? "bg-[#2C87E7]" : ""}`}
            onPress={() => setTab("Monthly")}
          >
            <Text
              className={`rounded-xl text-md font-bold ${tab === "Monthly" ? "text-white" : "text-white"}`}
            >
              Monthly
            </Text>
          </Pressable>
          {/* Toggle by Folder */}
          <Pressable
            className={`rounded-xl flex-1 items-center justify-center py-3 ${tab === "Folders" ? "bg-[#2C87E7]" : ""}`}
            onPress={() => setTab("Folders")}
          >
            <Text
              className={`rounded-xl text-md font-bold ${tab === "Folders" ? "text-white" : "text-white"}`}
            >
              Folder
            </Text>
          </Pressable>
        </View>
      </View>
      {/* Expense Table */}
      <ScrollView className="w-full">
        {tab === "Monthly" ? <MonthlyExpenseScreen /> : <FolderExpenseScreen />}
      </ScrollView>
      {/* Button to Add Expense */}
      <Pressable
        style={{
          position: "absolute",
          right: 16,
          bottom: 24,
          width: 56,
          height: 56,
          borderRadius: 28,
          alignItems: "center",
          justifyContent: "center",
          elevation: 4,
          backgroundColor: "#3B82F6",
        }}
        onPress={() => setModalVisible(true)}
      >
        <Text className="text-white text-center text-2xl">+</Text>
      </Pressable>

      {/* Modal */}
      <Modal
        animationType="fade"
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        {/* Full-screen overlay */}
        <View className="flex-1 items-center justify-center bg-black/50 px-6">
          {/* Tap outside to close */}
          <Pressable
            className="absolute inset-0"
            onPress={() => setModalVisible(false)}
          />

          {/* Centered modal card */}
          <View className="w-full max-w-md bg-[#1A1F29] border-2 border-[#2D3442] rounded-2xl p-4">
            <View className="flex flex-col mb-2 gap-2">
              <TextInput
                className="py-3 m-1 border-2 border-[#2D3442] p-4 text-white bg-[#252B38] rounded-2xl w-full"
                placeholder="Item Description"
                placeholderTextColor="#9CA3AF"
                value={expenseData.description}
                onChangeText={handleDescriptionChange}
              />

              <Select
                label=""
                placeholder="Select Category"
                value={category}
                options={categories}
                onChange={setCategory}
                searchable={false}
              />

              <TextInput
                className="py-3 m-1 border-2 border-[#2D3442] p-4 text-white bg-[#252B38] rounded-2xl w-full"
                placeholder="Amount"
                placeholderTextColor="#9CA3AF"
                keyboardType="numeric"
                value={expenseData.amount ? String(expenseData.amount) : ""}
                onChangeText={handleAmountChange}
              />

              <Pressable
                className="p-3 bg-blue-500 rounded-2xl w-full items-center justify-center"
                onPress={handleAddExpense}
              >
                <Text className="text-white text-sm font-semibold">
                  + Add Expense
                </Text>
              </Pressable>

              <Pressable
                className="bg-white rounded-2xl p-2 justify-center items-center w-full"
                onPress={() => setModalVisible(false)}
              >
                <Text className="text-black">Close</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}
