import { Image, StyleSheet, View } from "react-native";

import { ProductType } from "@/types/product-type";
import { Link } from "expo-router";
import { CustomText } from "./custom-text";

export type ProductCardProps = {
  product: ProductType;
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/products/${product.id}`} style={styles.card}>
      <Link.Preview />
      <Link.Trigger>
        <View>
          <View
            style={{
              backgroundColor: "#ffff",
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
            }}
          >
            <Image
              source={{ uri: product.image }}
              style={styles.image}
              resizeMode="contain"
            />
          </View>

          <View style={{paddingTop: 8, paddingBottom: 16, paddingHorizontal: 4}}>
            <CustomText
              style={styles.name}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {product.title}
            </CustomText>
            <CustomText style={styles.price}>${product.price}</CustomText>
          </View>
        </View>
      </Link.Trigger>
    </Link>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#3D3C37",
    width: "46%",
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: "100%",
    minWidth: "100%",
    height: 220,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  price: {
    fontSize: 14,
    color: "#888",
  },
});
