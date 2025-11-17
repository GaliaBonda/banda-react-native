import { StyleSheet } from "react-native";

import { ContainerView } from "@/components/container-view";
import { Footer } from "@/components/footer";
import { ProductView } from "@/components/product-view";
import { useSession } from "@/contexts/auth-context";
import { ProductType } from "@/types/product-type";
import { useSearchParams } from "expo-router/build/hooks";
import { useEffect, useState } from "react";
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
    <ContainerView style={{...styles.container, paddingBottom: insets.bottom, paddingTop: insets.top }}>
      
      {!!product?.id && <ProductView product={product}/>}
      <Footer />
    </ContainerView>
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
