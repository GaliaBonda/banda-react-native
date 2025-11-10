import { StyleSheet } from "react-native";
import { ThemedText } from "./themed-text";
import { ThemedView } from "./themed-view";
import { useSession } from "@/contexts/auth-context";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const Footer = () => {
  const insets = useSafeAreaInsets();
  const { signOut } = useSession();
  return (
    <ThemedView style={{ ...styles.footer, paddingBottom: insets.bottom }}>
      <ThemedText onPress={() => signOut()}>LogOut</ThemedText>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  footer: { width: "100%", flexDirection: "row", justifyContent: "flex-end" },
});
