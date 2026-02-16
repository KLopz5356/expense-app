import Feather from "@expo/vector-icons/Feather";
import { Image, Pressable, ScrollView, Text, View } from "react-native";

export default function Index() {
  return (
    <View className="flex-1 items-start justify-start p-4 gap-2">
      {/* Logo, Name, and text  */}
      <View className="w-full">
        <View className="flex flex-row items-end gap-4">
          <Image
            source={{ uri: "https://randomuser.me/api/portraits/men/41.jpg" }}
            className="bg-gray-200 rounded-full"
            style={{ width: 48, height: 48 }}
          />
          <Text className="text-white text-3xl">Hello, User</Text>
        </View>

        <Text className="text-gray-400 text-sm mt-1">
          Welcome to your expense tracker. Here's an overview of your expenses.
        </Text>
      </View>

      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        className="w-full"
        contentContainerStyle={{
          paddingTop: 5,
          paddingBottom: 5,
        }}
      >
        {/* Total Spent */}
        <View className="w-full bg-[#1A1F29] border-2 border-[#2D3442]  rounded-2xl p-4 mb-4">
          <View className="flex flex-row justify-between items-center mb-2">
            <Text className="text-gray-400 text-xl font-semibold">
              Total Spent
            </Text>
            <Feather name="dollar-sign" size={24} color="white" />
          </View>
          <Text className="text-white text-2xl mt-1 font-semibold">
            $1,234.56
          </Text>
          <Text className="text-gray-400 text-sm mt-1">0 Transactions</Text>
        </View>

        {/* This Month */}
        <View className="w-full bg-[#1A1F29] border-2 border-[#2D3442] rounded-2xl p-4 mb-4">
          <View className="flex flex-row justify-between items-center mb-2">
            <Text className="text-gray-400 text-xl font-semibold">
              This Month
            </Text>
            <Feather name="calendar" size={24} color="white" />
          </View>
          <Text className="text-white text-2xl mt-1 font-semibold">
            $567.89
          </Text>
          <Text className="text-gray-400 text-sm mt-1">0 Transactions</Text>
        </View>

        {/* Avg Expense Folder */}
        <View className="w-full bg-[#1A1F29] border-2 border-[#2D3442] rounded-2xl p-4 mb-4">
          <View className="flex flex-row justify-between items-center mb-2">
            <Text className="text-gray-400 text-xl font-semibold">
              Expense Folder
            </Text>
            <Feather name="folder" size={24} color="white" />
          </View>
          <Text className="text-white text-2xl mt-1 font-semibold">0</Text>
          <Text className="text-gray-400 text-sm mt-1">Active Folders</Text>
        </View>

        {/* Expense Folders */}
        <View className="w-full bg-[#1A1F29] border-2 border-[#2D3442] rounded-2xl p-4 mb-4">
          <View className="flex flex-row justify-between items-center mb-2">
            <Text className="text-gray-400 text-xl font-semibold">
              Expense Folder
            </Text>
            <Pressable className="bg-blue-500 rounded-full p-2">
              <Feather name="plus" size={16} color="white" />
            </Pressable>
          </View>
          <Text className="text-white text-2xl mt-1 font-semibold">0</Text>
          <Text className="text-gray-400 text-sm mt-1">Active Folders</Text>
        </View>

        {/* Profile */}
        <View className="w-full bg-[#1A1F29] border-2 border-[#2D3442] rounded-2xl p-4 mb-4">
          <View className="flex flex-row justify-between items-center mb-2">
            <Text className="text-gray-400 text-xl font-semibold">Profile</Text>
          </View>
          <View className="flex flex-row  justify-start items-center gap-4">
            <Image
              source={{ uri: "https://randomuser.me/api/portraits/men/41.jpg" }}
              className="bg-gray-200 rounded-full"
              style={{ width: 48, height: 48 }}
            />
            <View className="flex flex-col align-start justify-center">
              <Text className="text-white text-lg mt-2 font-semibold">
                John Doe
              </Text>
              <Text className="text-gray-400 text-sm">johndoe@example.com</Text>
            </View>
            <Feather
              className="border-2 border-[#ffff] border-rounded-full p-3 rounded-2xl mb-auto mt-auto"
              name="settings"
              size={16}
              color="white"
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
