import { StyleSheet, Image, View, ScrollView } from "react-native";

import { ThemedText } from "./themed-text";
import { ProductType } from "@/types/product-type";
import { ThemedView } from "./themed-view";

export type ProductViewProps = {
  product: ProductType;
};

export function ProductView({ product }: ProductViewProps) {
  return (
    <ThemedView>
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

        <ThemedText  type="subtitle">{product.title}</ThemedText>
        <ThemedText style={styles.price}>${product.price}</ThemedText>
        <View style={{ flexDirection: "column", gap: 24, marginTop: 12 }}>
          <ThemedText type="secondary" >
            {product.description}
          </ThemedText>
          <View>
            <ThemedText type="subtitle">Shipping & Returns</ThemedText>
            <ThemedText type="secondary">
              Free standard shipping and free 60-day returns
            </ThemedText>
          </View>
          {product.rating && (
            <View>
              <ThemedText type="subtitle">Reviews</ThemedText>
              <ThemedText style={styles.ratings}>{product.rating.rate} Ratings</ThemedText>
              <ThemedText type="secondary">{product.rating.count} Reviews</ThemedText>
            </View>
          )}
        </View>
      </ScrollView>
    </ThemedView>
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
