import { ScrollView, StyleSheet, View } from "react-native";

import { ContainerView } from "@/components/container-view";
import { CustomText } from "@/components/custom-text";
import { Footer } from "@/components/footer";
import { ProductCard } from "@/components/product-card";
import { useSession } from "@/contexts/auth-context";
import { ProductType } from "@/types/product-type";
import React, { useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

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
    <ContainerView style={{ ...styles.container, paddingTop: insets.top }}>
      <CustomText style={styles.title} type="title">
        Products
      </CustomText>
      <ScrollView style={{paddingTop: 20, }} contentContainerStyle={{ paddingBottom: 20 }}>
        <View style={styles.productsContainer}>
          {products?.map((product) => {
            return <ProductCard product={product} key={product.id} />;
          })}
        </View>
      </ScrollView>
      <Footer />
    </ContainerView>
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
