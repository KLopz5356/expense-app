import { dummyExpenses } from "@/src/dummyData";
import Feather from "@expo/vector-icons/Feather";
import React, { useState } from "react";
import {
  FlatList,
  Modal,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { Select, SelectOption } from "../../Components/Select";

export default function ExpenseScreen() {
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
        {/* Back, Icon, Folder Name */}
        <View className="w-full">
          <View className="flex flex-row items-end gap-4">
            <Feather name="folder" size={44} color="white" />
            <Text className="text-white text-3xl">Folder 1</Text>
          </View>
        </View>

        <View className="w-full flex flex-row justify-between items-center px-2">
          <Text className="text-gray-400 text-xl font-semibold">
            Expense Table
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
      {/* Add Expense Section */}
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
                onChangeText={(text) => console.log(text)}
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
                onChangeText={(text) => console.log(text)}
              />

              <Pressable className="p-3 bg-blue-500 rounded-2xl w-full items-center justify-center">
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
