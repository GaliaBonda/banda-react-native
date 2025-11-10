import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/use-color-scheme";
import { SplashScreenController } from "@/components/splash";
import { SessionProvider, useSession } from "@/contexts/auth-context";
import ToastManager from "toastify-react-native";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <SessionProvider>
      <SplashScreenController />
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <RootNavigator />
        <StatusBar style="auto" />
        <ToastManager
          theme={"dark"}
          style={{ marginTop: 20 }}
          showProgressBar={false}
          showCloseIcon={true}
          animationStyle="fade"
          useModal={false}
        />
      </ThemeProvider>
    </SessionProvider>
  );
}

function RootNavigator() {
  const { session } = useSession();
  return (
    <Stack
      screenOptions={(props) => {
        if (props.route.name?.startsWith("(auth)"))
          return {
            gestureEnabled: true,
            animation: "slide_from_bottom",
          };
          return {
            gestureEnabled: true,
            animation: "simple_push",
          };
      }}
    >
      <Stack.Protected guard={!!session}>
        <Stack.Screen
          name="products/index"
          options={{ title: "Products", headerShown: false }}
        />
      </Stack.Protected>
      <Stack.Protected guard={!!session}>
        <Stack.Screen
          name="products/[productId]/index"
          options={{
            headerTitle: "",
            headerStyle: {
              backgroundColor: "#232320",
            },
          }}
        />
      </Stack.Protected>
      <Stack.Protected guard={!session}>
        <Stack.Screen
          name="(auth)/sign-in"
          options={{
            header: () => null,
          }}
        />
      </Stack.Protected>
      <Stack.Protected guard={!session}>
        <Stack.Screen
          name="(auth)/password"
          options={{
            header: () => null,
          }}
        />
      </Stack.Protected>
      <Stack.Screen
        name="(auth)/sign-up"
        options={{
          header: () => null,
        }}
      />
    </Stack>
  );
}
