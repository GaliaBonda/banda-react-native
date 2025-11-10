import { Link, router } from "expo-router";
import { Button, StyleSheet, TextInput } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import React, { useEffect, useState } from "react";
import { useSession } from "@/contexts/auth-context";
import { Checkbox } from "@futurejj/react-native-checkbox";

export default function SignInScreen() {
  const insets = useSafeAreaInsets();

  const { signIn } = useSession();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [testingMode, setTestingMode] = useState(false);

  const toggleTestingMode = () => {
    setTestingMode((prev) => !prev);
  };

  return (
    <ThemedView
      style={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        padding: 24,
        height: "100%",
      }}
    >
      <ThemedText style={styles.title} type="title">
        Sign In
      </ThemedText>

      <ThemedView style={{ width: "100%", ...styles.container }}>
        <TextInput
          style={styles.input}
          onChangeText={setUsername}
          value={username}
          placeholder="Username"
          placeholderTextColor="#FFFFFF80"
        />
        <TextInput
          placeholderTextColor="#FFFFFF80"
          style={styles.input}
          onChangeText={setPassword}
          value={password}
          placeholder="Password"
          // secureTextEntry={true}
        />
        <Link
          href="/sign-up"
          style={{ alignSelf: "flex-start", textDecorationLine: "underline" }}
        >
          <Link.Trigger>
            <ThemedText type="link" style={{ color: "#ffff", fontSize: 14 }}>
              Sign up
            </ThemedText>
          </Link.Trigger>
          <Link.Preview />
        </Link>
        <ThemedView style={{ alignSelf: 'flex-start',}}>
          <ThemedView style={styles.checkboxContainer}>
            <Checkbox
              status={testingMode ? "checked" : "unchecked"}
              onPress={toggleTestingMode}
              style={styles.checkbox}
            />
            <ThemedText style={styles.label}>
              Use testing sign-in data?
            </ThemedText>
          </ThemedView>
        </ThemedView>
        <Button
          title="Continue"
          onPress={async () => {
            console.log({ username, password });
            if (!username || !password) {
              throw new Error("No auth");
            }
            const success = await signIn({
              username,
              password,
              testingMode,
            });
            if (success) {
              router.replace("/");
            }
          }}
        />
      </ThemedView>
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
    color: "#FFFFFF",
    fontSize: 16,
  },
  input: {
    height: 56,
    width: "100%",
    borderWidth: 1,
    padding: 10,
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
