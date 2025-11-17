import { Image, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";

export const CustomHeader = () => {
  const router = useRouter();

  return (
    <TouchableOpacity
      onPress={() => {
        router.back();
      }}
    >
      <View
        style={{
          borderRadius: 100,
          backgroundColor: "#3D3C37",
          height: 40,
          width: 40,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image source={require("../../assets/images/broken-arrow.png")} />
      </View>
    </TouchableOpacity>
  );
};
