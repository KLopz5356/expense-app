import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import "../../global.css";

const AppDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: "#0F1419",
  },
};

export default function RootLayout() {
  return (
    <ThemeProvider value={AppDarkTheme}>
      <Stack>
        {/* <Stack.Screen name="index" options={{ title: "Pokemon List" }} /> */}
        <Stack.Screen
          name="details"
          options={{
            title: "Pokemon Details",
            presentation: "formSheet",
            sheetAllowedDetents: [0.3, 0.5, 0.7],
            sheetGrabberVisible: true,
          }}
        />
      </Stack>
    </ThemeProvider>
  );
}
