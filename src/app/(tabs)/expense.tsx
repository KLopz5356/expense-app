import Feather from "@expo/vector-icons/Feather";
import {
  Image,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function ExpenseScreen() {
  return (
    <>
      <SafeAreaProvider>
        <SafeAreaView edges={["top"]} style={{ flex: 1 }}>
          <View className="flex-1 items-start justify-start p-4 gap-2">
            {/* Back, Icon, Folder Name */}
            <View className="w-full">
              <View className="flex flex-row items-end gap-4">
                <Feather name="folder" size={44} color="white" />
                <Text className="text-white text-3xl">Folder 1</Text>
              </View>
            </View>

            {/* Add Expense */}
            <View className="w-full bg-[#1A1F29] border-2 border-[#2D3442]  rounded-2xl p-4">
              <View className="flex flex-col mb-2">
                <TextInput
                  className="h-15 m-1 border-2 border-[#2D3442] p-4 text-white bg-[#1A1F29] rounded-2xl "
                  placeholder="Item Description"
                  onChangeText={(text) => console.log(text)}
                ></TextInput>
                {/* Dropdown select for category */}

                <TextInput
                  className="h-15 m-1 border-2 border-[#2D3442] p-4 text-white bg-[#1A1F29] rounded-2xl "
                  placeholder="Amount"
                  keyboardType="numeric"
                  onChangeText={(text) => console.log(text)}
                ></TextInput>
                <Pressable className="p-4 bg-blue-500 rounded-2xl m-1 w-full items-center justify-center">
                  <Text className="text-white text-sm place-self-center">
                    + Add Expense
                  </Text>
                </Pressable>
              </View>
            </View>

            <ScrollView
              contentInsetAdjustmentBehavior="automatic"
              className="w-full"
              contentContainerStyle={{
                paddingTop: 5,
                paddingBottom: 5,
              }}
            >
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
                <Text className="text-gray-400 text-sm mt-1">
                  0 Transactions
                </Text>
              </View>

              {/* Avg Expense Folder */}
              <View className="w-full bg-[#1A1F29] border-2 border-[#2D3442] rounded-2xl p-4 mb-4">
                <View className="flex flex-row justify-between items-center mb-2">
                  <Text className="text-gray-400 text-xl font-semibold">
                    Expense Folder
                  </Text>
                  <Feather name="folder" size={24} color="white" />
                </View>
                <Text className="text-white text-2xl mt-1 font-semibold">
                  0
                </Text>
                <Text className="text-gray-400 text-sm mt-1">
                  Active Folders
                </Text>
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
                <Text className="text-white text-2xl mt-1 font-semibold">
                  0
                </Text>
                <Text className="text-gray-400 text-sm mt-1">
                  Active Folders
                </Text>
              </View>

              {/* Profile */}
              <View className="w-full bg-[#1A1F29] border-2 border-[#2D3442] rounded-2xl p-4 mb-4">
                <View className="flex flex-row justify-between items-center mb-2">
                  <Text className="text-gray-400 text-xl font-semibold">
                    Profile
                  </Text>
                </View>
                <View className="flex flex-row  justify-start items-center gap-4">
                  <Image
                    source={{
                      uri: "https://randomuser.me/api/portraits/men/41.jpg",
                    }}
                    className="bg-gray-200 rounded-full"
                    style={{ width: 48, height: 48 }}
                  />
                  <View className="flex flex-col align-start justify-center">
                    <Text className="text-white text-lg mt-2 font-semibold">
                      John Doe
                    </Text>
                    <Text className="text-gray-400 text-sm">
                      johndoe@example.com
                    </Text>
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
        </SafeAreaView>
      </SafeAreaProvider>
    </>
  );
}
