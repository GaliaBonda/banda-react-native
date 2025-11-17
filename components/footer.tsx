import { useSession } from "@/contexts/auth-context";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { StyleSheet, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ContainerView } from "./container-view";

export const Footer = () => {
  const insets = useSafeAreaInsets();
  const { signOut } = useSession();
  return (
    <ContainerView style={{ ...styles.footer, paddingBottom: insets.bottom }}>
      <TouchableOpacity onPress={signOut}>
        <MaterialIcons name="logout" color="white" size={24}/>
      </TouchableOpacity>
    </ContainerView>
  );
};

const styles = StyleSheet.create({
  footer: { width: "100%", flexDirection: "row", justifyContent: "flex-end", padding: 10 },
});
