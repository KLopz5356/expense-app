import { dummyExpenses } from "@/src/dummyData";
import Feather from "@expo/vector-icons/Feather";
import React, { useState } from "react";
import {
    FlatList,
    ScrollView,
    Text,
    View
} from "react-native";
import { SelectOption } from "../Select";

export default function FolderExpenseScreen() {
  // States
  const [category, setCategory] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const categories: SelectOption[] = [
    { label: "Food", value: "food" },
    { label: "Bills", value: "bills" },
    { label: "Transpo", value: "transpo" },
    { label: "Shopee (oops)", value: "shopee" },
  ];

  // Business Logic
  const grandTotal = dummyExpenses.reduce(
    (sum, expense) => sum + expense.amount,
    0,
  );

  return (
    <>
      <View className="flex-1 items-start justify-start p-4 gap-2">
        <View className="w-full flex flex-row justify-between items-center px-2">
          <Text className="text-gray-400 text-xl font-semibold">
            Folder Expense Table
          </Text>
          <Feather name="settings" size={16} color="white" />
        </View>

        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          className="w-full"
          contentContainerStyle={{
            paddingTop: 5,
            paddingBottom: 5,
          }}
        >
          {/* Expense Table */}
          <View className="w-full bg-[#1A1F29] border-2 border-[#2D3442] rounded-2xl p-4 mb-4">
            {/* Render Table */}
            <View className="flex flex-row justify-between py-2 border-b border-[#2D3442]">
              <Text className="text-gray-400">Item</Text>
              <Text className="text-gray-400">Category</Text>
              <Text className="text-gray-400">Amount</Text>
            </View>
            <FlatList
              data={dummyExpenses}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <View className="flex flex-row justify-between py-2 border-b border-[#2D3442]">
                  <Text
                    className="text-white w-32"
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    {item.description}
                  </Text>
                  <Text className="text-white flex-1 px-2" numberOfLines={1}>
                    {item.category}
                  </Text>
                  <Text className="text-white w-16 text-right">
                    ${item.amount.toFixed(2)}
                  </Text>
                </View>
              )}
              scrollEnabled={false}
            />
            {/* Grand Total Expense */}
            <View className="flex flex-row justify-between py-2">
              <Text className="text-white text-2xl mt-1 font-semibold">
                Total:
              </Text>
              <Text className="text-white text-right text-2xl mt-1 font-semibold">
                ${grandTotal.toFixed(2)}
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  );
}
