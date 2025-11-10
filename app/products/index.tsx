import { Link } from "expo-router";
import { ScrollView, StyleSheet } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import React, { useEffect, useState } from "react";
import { ProductType } from "@/types/product-type";
import { ProductCard } from "@/components/product-card";

export default function ProductsScreen() {
  const insets = useSafeAreaInsets();

  const [products, setProducts] = useState<ProductType[]>();

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    
      <ThemedView style={{ ...styles.container, paddingTop: insets.top, paddingBottom: insets.bottom }}>
        <ThemedText style={styles.title} type="title">
          Products
        </ThemedText>
        <ScrollView>
        <ThemedView style={styles.productsContainer}>
          {products?.map((product) => {
            return (
              <ProductCard product={product} key={product.id}/>
            );
          })}
        </ThemedView>
        </ScrollView>
      </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  productsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: 20,
    flex: 1,
  },
});
