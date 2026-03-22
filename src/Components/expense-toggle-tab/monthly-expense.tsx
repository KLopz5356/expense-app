import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import { useEffect, useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { expensesRepo } from "../../lib/repo/expensesRepo";
import type { Expense } from "../../types";

export default function MonthScreen() {
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

  const prevMonth = () => {
    // action to prev month
    setMonth((prevM) => {
      let newMonth = prevM - 1;
      let newYear = year;
      if (newMonth < 1) {
        newMonth = 12;
        newYear = year - 1;
      }
      setYear(newYear);
      return newMonth;
    });
  };
  const nextMonth = () => {
    // action to next month
    setMonth((prevM) => {
      let newMonth = prevM + 1;
      let newYear = year;
      if (newMonth > 12) {
        newMonth = 1;
        newYear = year + 1;
      }
      setYear(newYear); // Update year if needed
      return newMonth;
    });
  };

  const totalAmount = items.reduce((s, e) => s + e.amount, 0);

  return (
    <>
      <View className="flex-1 items-start justify-start p-4 gap-2">
        <View className="w-full bg-[#1A1F29] border-2 border-[#2D3442] rounded-2xl p-4 mb-4">
          {/* Able to switch month */}
          <View className="flex flex-row justify-between items-center mx-4">
            <Pressable onPress={prevMonth}>
              <AntDesign name="left" size={16} color="white" />
            </Pressable>
            {/* Total and Month */}
            <View className="flex flex-col justify-between py-2 items-center">
              <Text className="text-gray-400 text-2xl">
                {new Date(year, month - 1).toLocaleString("default", {
                  month: "long",
                })}{" "}
                {year}
              </Text>
              <Text className="text-white text-right text-2xl mt-1 font-semibold">
                ${totalAmount.toFixed(2)}
              </Text>
            </View>
            <Pressable onPress={nextMonth}>
              <AntDesign name="right" size={16} color="white" />
            </Pressable>
          </View>
        </View>
        <View className="w-full flex flex-row justify-between items-center px-2">
          <Text className="text-gray-400 text-xl font-semibold">
            Monthly Expense Table
          </Text>
          <Feather name="settings" size={16} color="white" />
        </View>

        {/* Expense Table */}
        <View className="w-full bg-[#1A1F29] border-2 border-[#2D3442] rounded-2xl p-4 mb-4">
          {/* Render Table */}
          <View className="flex flex-row justify-between py-2 border-b border-[#2D3442]">
            <Text className="text-gray-400">Item</Text>
            <Text className="text-gray-400">Category</Text>
            <Text className="text-gray-400">Date</Text>
            <Text className="text-gray-400">Amount</Text>
          </View>
          <FlatList
            data={items}
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
                <Text>{new Date(item.createdAt).toLocaleDateString()}</Text>
                <Text className="text-white w-16 text-right">
                  ${item.amount.toFixed(2)}
                </Text>
              </View>
            )}
            scrollEnabled={false}
          />
        </View>
      </View>
    </>
  );
}
