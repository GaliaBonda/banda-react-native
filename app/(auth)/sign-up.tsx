import { router } from "expo-router";
import { StyleSheet, TextInput } from "react-native";

import { ContainerView } from "@/components/container-view";
import { CustomText } from "@/components/custom-text";
import { useSession } from "@/contexts/auth-context";
import React, { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { CustomButton } from "@/components/ui/button";
import PasswordInput from "@/components/ui/password-input";

export default function SignUpScreen() {
  const insets = useSafeAreaInsets();

  const { signUp } = useSession();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <ContainerView
      style={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        padding: 24,
        height: "100%",
      }}
    >
      <ContainerView style={{ width: "100%", ...styles.container }}>
        <CustomText style={styles.title} type="title">
          Sign Up
        </CustomText>
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
        <PasswordInput password={password} setPassword={setPassword} />

        <CustomButton
          onPress={async () => {
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
        >
          Continue
        </CustomButton>
      </ContainerView>
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
});
