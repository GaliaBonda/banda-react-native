import { Link, useRouter } from "expo-router";
import { StyleSheet, TextInput, View } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import React, { useCallback, useState } from "react";
import { useSession } from "@/contexts/auth-context";
import { Toast } from "toastify-react-native";
import { CustomButton } from "@/components/ui/button";

export default function SignInScreen() {
  const insets = useSafeAreaInsets();

  const [username, setUsername] = useState("");

  const { setUserName } = useSession();

  const router = useRouter();

  const handleContinue = useCallback(async () => {
    if (!username) {
      Toast.error("Username cannot be empty");
      return;
    }
    setUserName(username);
    router.push('/(auth)/password')
  }, [username]);

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

        <TextInput
          style={styles.input}
          onChangeText={setUsername}
          value={username}
          placeholder="Username"
          placeholderTextColor="#FFFFFF80"
        />

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
