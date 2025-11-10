import { router } from "expo-router";
import { StyleSheet, TextInput, View } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import React, { useCallback, useState } from "react";
import { useSession } from "@/contexts/auth-context";
import { Checkbox } from "@futurejj/react-native-checkbox";
import { Toast } from "toastify-react-native";
import { CustomButton } from "@/components/ui/button";
import { AnimateInView } from "@/components/animate-in-view";

export default function PasswordScreen() {
  const insets = useSafeAreaInsets();

  const { signIn, userName } = useSession();
 
  const [password, setPassword] = useState("");
  const [testingMode, setTestingMode] = useState(false);

  const toggleTestingMode = () => {
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
        router.replace("/products");
      }
    } catch (er) {
      const error = er as { message: string };
      console.error(error);
      Toast.error(`Authorization error: ${error.message}`);
    }
  }, [userName, password, signIn, testingMode]);

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
         
          <AnimateInView style={{ width: "100%" }}>
            <TextInput
              placeholderTextColor="#FFFFFF80"
              style={styles.input}
              onChangeText={setPassword}
              value={password}
              placeholder="Password"
              // secureTextEntry={true}
            />
          </AnimateInView>
        
       
       
          <View style={{ alignSelf: "flex-start" }}>
            <View style={styles.checkboxContainer}>
              <Checkbox
                status={testingMode ? "checked" : "unchecked"}
                onPress={toggleTestingMode}
                style={styles.checkbox}
                color="#FFD600"
              />
              <ThemedText style={styles.label}>
                Use testing sign-in data?
              </ThemedText>
            </View>
          </View>
        
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
