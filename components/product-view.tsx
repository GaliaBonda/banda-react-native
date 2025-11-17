import { Image, ScrollView, StyleSheet, View } from "react-native";

import { ProductType } from "@/types/product-type";
import { ContainerView } from "./container-view";
import { CustomText } from "./custom-text";

export type ProductViewProps = {
  product: ProductType;
};

export function ProductView({ product }: ProductViewProps) {
  return (
    <ContainerView>
      <ScrollView
        style={{ paddingTop: 20 }}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        <View style={{ flexDirection: "column", alignItems: "center", marginBottom: 12 }}>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: product.image }}
              style={styles.image}
              resizeMode="contain"
            />
          </View>
        </View>

        <CustomText  type="subtitle">{product.title}</CustomText>
        <CustomText style={styles.price}>${product.price}</CustomText>
        <View style={{ flexDirection: "column", gap: 24, marginTop: 12 }}>
          <CustomText type="secondary" >
            {product.description}
          </CustomText>
          <View>
            <CustomText type="subtitle">Shipping & Returns</CustomText>
            <CustomText type="secondary">
              Free standard shipping and free 60-day returns
            </CustomText>
          </View>
          {product.rating && (
            <View>
              <CustomText type="subtitle">Reviews</CustomText>
              <CustomText style={styles.ratings}>{product.rating.rate} Ratings</CustomText>
              <CustomText type="secondary">{product.rating.count} Reviews</CustomText>
            </View>
          )}
        </View>
      </ScrollView>
    </ContainerView>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
  },
  image: {
    height: 273,
    width: "auto",
    minWidth: "50%",
    maxWidth: "80%",
  },

  ratings: {
    fontSize: 24,
    marginBottom: 12,
    marginTop: 12

  },
  price: {
    fontSize: 16,
    color: "#FFD600",
    fontWeight: 700,
    marginTop: 8,
  },
});
