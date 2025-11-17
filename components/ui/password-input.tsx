import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  ViewProps,
} from "react-native";

import React, { useState } from "react";
import MaterialIcons from "@expo/vector-icons/MaterialCommunityIcons";

export type PasswordInputProps = ViewProps & {
  password: string;
  setPassword: (pass: string) => void;
};

export default function PasswordInput({
  password,
  setPassword,
}: PasswordInputProps) {
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  return (
    <View style={styles.container}>
      <TextInput
        placeholderTextColor="#FFFFFF80"
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        placeholder="Password"
        secureTextEntry={secureTextEntry}
      />
      <TouchableOpacity
        onPress={() => {
          setSecureTextEntry((prev) => !prev);
        }}
      >
        <MaterialIcons
          style={{
            position: "absolute",
            right: 12,
            bottom: 16,
            height: 24,
            width: 24,
          }}
          name={secureTextEntry ? "eye-off" : "eye"}
          color="white"
          size={24}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    position: "relative",
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
