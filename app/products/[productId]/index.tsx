import { StyleSheet } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useSearchParams } from "expo-router/build/hooks";
import AnimatedStyleUpdateExample from "@/components/animation-example";
import { useEffect, useState } from "react";
import { ProductType } from "@/types/product-type";
import { Footer } from "@/components/footer";
import { useSession } from "@/contexts/auth-context";

export default function ProductScreen() {
  const param = useSearchParams();

  const productId = param.get("productId");

  const {session} = useSession();

  const [product, setProduct] = useState<ProductType>();

  useEffect(() => {
    if (!productId || !session) return;
    fetch(`https://fakestoreapi.com/products/${productId}`, {
      headers: {
        Authorization: `Bearer ${session}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setProduct(data));
  }, [productId, session]);

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title} type="title">
        Product {param.get("productId")}
      </ThemedText>
      <ThemedText>{JSON.stringify(product)}</ThemedText>
      <AnimatedStyleUpdateExample />
      <Footer />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 16,
  },
});
