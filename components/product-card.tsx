import {StyleSheet } from "react-native";

import { Link } from "expo-router";
import { ThemedText } from "./themed-text";
import { ProductType } from "@/types/product-type";
import { ThemedView } from "./themed-view";

export type ProductCardProps = {
  product: ProductType;
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <ThemedView
      key={product.id}
      style={{
        maxWidth: "46%",
      }}
    >
      <Link href={`/products/${product.id}`}>
        <Link.Trigger>
          <ThemedText type="subtitle">
            {product.title}, {product.price}
          </ThemedText>
        </Link.Trigger>
        <Link.Preview />
      </Link>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  productsContainer: {
    // display: 'flex',
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: 20,
    flex: 1,
  },
});
