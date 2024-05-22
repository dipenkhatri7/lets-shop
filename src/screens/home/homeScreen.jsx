import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  ScrollView,
  Dimensions,
} from "react-native";
import { useCart } from "../../store/cart-context";
import Loading from "../../components/loading";
import { fetchProducts } from "../../utils/http";
import CarouselSlider from "./components/carousel";
import CategoryText from "./components/categoryText";
import ProductItem from "../../components/productItem";

const screenHeight = Dimensions.get("window").height;

function HomeScreen({ navigation }) {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await fetchProducts();
      setProducts(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loading message={"Loading products..."} />;
  }

  return (
    <ScrollView style={styles.container}>
      <CategoryText
        leftText="Best Offers"
        imageSourcePrototype={require("../../../assets/images/best_picks.png")}
        onPress={() => {}}
      />
      <View className="h-px w-full bg-gray-400 mb-3" />
      <View style={styles.carouselContainer}>
        <CarouselSlider items={products} />
      </View>
      <View className="h-px w-full bg-gray-400 mt-7 mb-2" />
      <CategoryText
        leftText="Available Products"
        rightText="See all"
        onPress={() => {
          navigation.navigate("Search");
        }}
      />
      <View className="mt-4" />

      <View style={styles.listContainer}>
        <FlatList
          data={products}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <ProductItem product={item} addToCart={addToCart} />
          )}
          scrollEnabled={false}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  carouselContainer: {
    height: screenHeight / 3,
  },
  bestPicksText: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  productContainer: {
    marginBottom: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    alignItems: "center",
  },
  productImage: {
    width: "100%",
    height: 200,
    resizeMode: "contain",
  },
  productTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 8,
  },
  productPrice: {
    fontSize: 16,
    color: "#888",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },
  quantityText: {
    marginHorizontal: 8,
    fontSize: 16,
  },
});

export default HomeScreen;
