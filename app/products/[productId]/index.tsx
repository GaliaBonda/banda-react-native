import { StyleSheet } from "react-native";

import { ThemedView } from "@/components/themed-view";
import { useSearchParams } from "expo-router/build/hooks";
import { useEffect, useState } from "react";
import { ProductType } from "@/types/product-type";
import { Footer } from "@/components/footer";
import { useSession } from "@/contexts/auth-context";
import { ProductView } from "@/components/product-view";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ProductScreen() {
  const insets = useSafeAreaInsets();
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
    <ThemedView style={{...styles.container, paddingBottom: insets.bottom, paddingTop: insets.top }}>
      
      {!!product?.id && <ProductView product={product}/>}
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
