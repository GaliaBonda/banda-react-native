import { ScrollView, StyleSheet } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import React, { useEffect, useState } from "react";
import { ProductType } from "@/types/product-type";
import { ProductCard } from "@/components/product-card";
import { Footer } from "@/components/footer";
import { useSession } from "@/contexts/auth-context";

export default function ProductsScreen() {
  const insets = useSafeAreaInsets();

  const [products, setProducts] = useState<ProductType[]>();

  const {session} = useSession();

  useEffect(() => {
    if (!session) return;
    fetch("https://fakestoreapi.com/products", {
      headers: {
        Authorization: `Bearer ${session}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, [session]);

  return (
    <ThemedView style={{ ...styles.container, paddingTop: insets.top }}>
      <ThemedText style={styles.title} type="title">
        Products
      </ThemedText>
      <ScrollView style={{paddingTop: 20, }} contentContainerStyle={{ paddingBottom: 20 }}>
        <ThemedView style={styles.productsContainer}>
          {products?.map((product) => {
            return <ProductCard product={product} key={product.id} />;
          })}
        </ThemedView>
      </ScrollView>
      <Footer />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 24,
    paddingRight: 24,
    paddingBottom: 20,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 16,
    alignSelf: 'flex-start'
  },
  productsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: 20,
    flex: 1,
  },
});
