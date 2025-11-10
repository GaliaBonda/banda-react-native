import { StyleSheet, Image, View } from "react-native";

import { Link } from "expo-router";
import { ThemedText } from "./themed-text";
import { ProductType } from "@/types/product-type";

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
              resizeMode="cover"
            />
          </View>

          <ThemedText
            style={styles.name}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {product.title}
          </ThemedText>
          <ThemedText style={styles.price}>${product.price}</ThemedText>
        </View>
      </Link.Trigger>
    </Link>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#3D3C37",
    maxWidth: "46%",
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: "100%",
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
    marginBottom: 10,
  },
});
