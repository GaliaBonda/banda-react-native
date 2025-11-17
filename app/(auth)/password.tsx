import { router } from "expo-router";
import { GestureResponderEvent, StyleSheet, TouchableOpacity, View } from "react-native";

import { ContainerView } from "@/components/container-view";
import { CustomText } from "@/components/custom-text";
import { CustomButton } from "@/components/ui/button";
import { useSession } from "@/contexts/auth-context";
import { Checkbox } from "@futurejj/react-native-checkbox";
import React, { useCallback, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Toast } from "toastify-react-native";
import PasswordInput from "@/components/ui/password-input";

export default function PasswordScreen() {
  const insets = useSafeAreaInsets();

  const { signIn, userName } = useSession();

  const [password, setPassword] = useState("");
  const [testingMode, setTestingMode] = useState(false);

  const toggleTestingMode = (event: GestureResponderEvent) => {
    event.stopPropagation();
    setTestingMode((prev) => !prev);
  };

  const handleContinue = useCallback(async () => {
    if (!userName) {
      Toast.error("Username is not found");
      router.replace("/(auth)/sign-in");
      return;
    }
    if (!password) {
      Toast.error("Password is required");
      return;
    }
    try {
      const success = await signIn({
        username: userName,
        password,
        testingMode,
      });

      if (success) {
        router.replace("/");
      }
    } catch (er) {
      const error = er as { message: string };
      console.error(error);
      Toast.error(`Authorization error: ${error.message}`);
    }
  }, [userName, password, signIn, testingMode]);

  return (
    <ContainerView
      style={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        padding: 24,
        height: "100%",
      }}
    >
      <View style={{ width: "100%", ...styles.container }}>
        <CustomText style={styles.title} type="title">
          Sign In
        </CustomText>

        <PasswordInput password={password} setPassword={setPassword} />

        <View style={{ alignSelf: "flex-start" }}>
          <TouchableOpacity onPress={toggleTestingMode}>
            <View style={styles.checkboxContainer}>
              <Checkbox
                status={testingMode ? "checked" : "unchecked"}
                style={styles.checkbox}
                color="#FFD600"
                onPress={toggleTestingMode}
              />
              <CustomText style={styles.label}>
                Use testing sign-in data?
              </CustomText>
            </View>
          </TouchableOpacity>
        </View>

        <CustomButton onPress={handleContinue}>Continue</CustomButton>
      </View>
    </ContainerView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",

    gap: 16,
  },
  title: {
    alignSelf: "flex-start",
    marginBottom: 32,
  },
  input: {
    height: 56,
    width: "100%",
    paddingVertical: 15,
    paddingHorizontal: 12,
    backgroundColor: "#2F2F2D",
    color: "#ffff",
    borderRadius: 4,
  },
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: "center",
  },
  label: {
    margin: 8,
  },
});
