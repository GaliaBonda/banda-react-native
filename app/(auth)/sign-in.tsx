import { Link, router } from "expo-router";
import { BackHandler, StyleSheet, TextInput, View } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import React, { useCallback, useEffect, useState } from "react";
import { useSession } from "@/contexts/auth-context";
import { Checkbox } from "@futurejj/react-native-checkbox";
import { Toast } from "toastify-react-native";
import { CustomButton } from "@/components/ui/button";

export default function SignInScreen() {
  const insets = useSafeAreaInsets();

  const { signIn } = useSession();

  const [step, setStep] = useState<"USERNAME" | "PASSWORD">("USERNAME");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [testingMode, setTestingMode] = useState(false);

  const toggleTestingMode = () => {
    setTestingMode((prev) => !prev);
  };

  useEffect(() => {
    const backAction = () => {
      if (step === "USERNAME") return false;
      setStep("USERNAME");
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove(); // Clean up the event listener
  }, [step]);

  const handleContinue = useCallback(async () => {
    if (!username) {
      Toast.error("Username cannot by empty");
      return;
    }
    if (step === "USERNAME") {
      setStep("PASSWORD");
      return;
    }
    console.log(username, password);
    if (!username || !password) {
      Toast.error("Username and password are required");
      return;
    }
    try {
      const success = await signIn({
        username,
        password,
        testingMode,
      });

      if (success) {
        router.replace("/products");
      }
    } catch (er) {
      const error = er as { message: string };
      console.error(error);
      Toast.error(`Authorization error: ${error.message}`);
    }
  }, [username, password, step]);

  return (
    <ThemedView
      style={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        padding: 24,
        height: "100%",
      }}
    >
      <View style={{ width: "100%", ...styles.container }}>
        <ThemedText style={styles.title} type="title">
          Sign In
        </ThemedText>
        {step === "USERNAME" && (
          <TextInput
            style={styles.input}
            onChangeText={setUsername}
            value={username}
            placeholder="Username"
            placeholderTextColor="#FFFFFF80"
          />
        )}
        {step === "PASSWORD" && (
          <TextInput
            placeholderTextColor="#FFFFFF80"
            style={styles.input}
            onChangeText={setPassword}
            value={password}
            placeholder="Password"
            // secureTextEntry={true}
          />
        )}
        {step === "USERNAME" && (
          <Link
            href="/sign-up"
            style={{ alignSelf: "flex-end", textDecorationLine: "underline" }}
          >
            <Link.Trigger>
              <ThemedText type="link" style={{ color: "#ffff", fontSize: 14 }}>
                Sign up
              </ThemedText>
            </Link.Trigger>
            <Link.Preview />
          </Link>
        )}
        {step === "PASSWORD" && (
          <View style={{ alignSelf: "flex-start" }}>
            <View style={styles.checkboxContainer}>
              <Checkbox
                status={testingMode ? "checked" : "unchecked"}
                onPress={toggleTestingMode}
                style={styles.checkbox}
              />
              <ThemedText style={styles.label}>
                Use testing sign-in data?
              </ThemedText>
            </View>
          </View>
        )}
        <CustomButton onPress={handleContinue}>Continue</CustomButton>
      </View>
    </ThemedView>
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
    color: "#FFFFFF80",
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
