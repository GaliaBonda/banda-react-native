import { router } from "expo-router";
import { Button, ScrollView, StyleSheet, TextInput } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import React, { useEffect, useState } from "react";
import { useSession } from "@/contexts/auth-context";

export default function SignUpScreen() {
  const insets = useSafeAreaInsets();

  const { signUp } = useSession();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
          style={styles.input}
          onChangeText={setEmail}
          value={email}
          placeholder="Email"
          placeholderTextColor="#FFFFFF80"
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
          autoCorrect={false}
        />
        <TextInput
          placeholderTextColor="#FFFFFF80"
          style={styles.input}
          onChangeText={setPassword}
          value={password}
          placeholder="Password"
        //   secureTextEntry={true}
        />
        <Button
          title="Continue"
          onPress={async () => {
            console.log({ username, password });
            if (!username || !password || !email) {
              throw new Error("No auth");
            }
            const newUser = await signUp({ username, password, email });
            if (!newUser) {
                throw new Error("Sign up failed: user profile wasn't created");
            }
            // Navigate after signing in. You may want to tweak this to ensure sign-in is successful before navigating.
            router.replace("/sign-in");
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
});
