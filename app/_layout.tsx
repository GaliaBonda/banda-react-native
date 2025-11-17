import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { SplashScreenController } from "@/components/splash";
import { SessionProvider, useSession } from "@/contexts/auth-context";
import ToastManager from "toastify-react-native";
import { CustomHeader } from "@/components/ui/custom-header";

export default function RootLayout() {
  return (
    <SessionProvider>
      <SplashScreenController />
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
    </SessionProvider>
  );
}

function RootNavigator() {
  const { session } = useSession();

  return (
    <Stack
      screenOptions={(props) => {
        if (props?.route?.name?.startsWith("(auth)"))
          return {
            animation: "slide_from_bottom",
          };
        return {
          animation: "simple_push",
        };
      }}
    >
      <Stack.Protected guard={!!session}>
        <Stack.Screen
          name="index"
          options={{ title: "Products", headerShown: false }}
        />
      </Stack.Protected>
      <Stack.Protected guard={!!session}>
        <Stack.Screen
          name="products/[productId]/index"
          options={{
            headerLeft: () => <CustomHeader />,
            title: "",
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
            headerLeft: () => <CustomHeader />,
            title: "",
            headerStyle: {
              backgroundColor: "#232320",
            },
          }}
        />
      </Stack.Protected>
      <Stack.Screen
        name="(auth)/sign-up"
        options={{
          headerLeft: () => <CustomHeader />,
          title: "",
          headerStyle: {
            backgroundColor: "#232320",
          },
        }}
      />
    </Stack>
  );
}
