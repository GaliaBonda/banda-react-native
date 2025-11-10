import { StyleSheet, TouchableOpacity } from "react-native";
import { ThemedView } from "./themed-view";
import { useSession } from "@/contexts/auth-context";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export const Footer = () => {
  const insets = useSafeAreaInsets();
  const { signOut } = useSession();
  return (
    <ThemedView style={{ ...styles.footer, paddingBottom: insets.bottom }}>
      <TouchableOpacity onPress={signOut}>
        <MaterialIcons name="logout" color="white" size={24}/>
      </TouchableOpacity>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  footer: { width: "100%", flexDirection: "row", justifyContent: "flex-end", padding: 10 },
});
