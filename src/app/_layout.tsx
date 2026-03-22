import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "../../global.css";
import { migrate } from "../lib/db/migrate";

const AppDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: "#0F1419",
  },
};

export default function RootLayout() {
  useEffect(() => {
    migrate();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <ThemeProvider value={AppDarkTheme}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          </Stack>
          {/* <Stack>
        <Stack.Screen name="index" options={{ title: "Pokemon List" }} />
        <Stack.Screen
          name="details"
          options={{
            title: "Pokemon Details",
            presentation: "formSheet",
            sheetAllowedDetents: [0.3, 0.5, 0.7],
            sheetGrabberVisible: true,
          }}
        />
      </Stack> */}
        </ThemeProvider>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}
