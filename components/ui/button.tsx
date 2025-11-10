import { PropsWithChildren } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

type CustomButtonProps = PropsWithChildren<{ onPress: () => void }>;

export const CustomButton = ({ children, onPress }: CustomButtonProps) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#FFD600",
    paddingVertical: 11,
    paddingHorizontal: 20,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    width: '100%'
  },
  buttonText: {
    color: "#232320",
    fontSize: 16,
    lineHeight: 26
  },
});
