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

// Get the height of the screen
const screenHeight = Dimensions.get("window").height;

/**
 * Component for the home screen displaying various product categories and available products.
 * Fetches and displays products from the server.
 */
function HomeScreen({ navigation }) {
  const [products, setProducts] = useState([]); // State to store fetched products
  const { addToCart } = useCart(); // Access addToCart function from cart context
  const [isLoading, setIsLoading] = useState(true); // State to track loading status

  // Fetch products from the server when the component mounts
  useEffect(() => {
    fetchData();
  }, []);

  // Function to fetch products from the server
  const fetchData = async () => {
    try {
      const data = await fetchProducts();
      setProducts(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false); // Update loading state after fetching data
    }
  };

  // Render loading indicator while fetching data
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
      <View style={styles.separator} />
      <View style={styles.carouselContainer}>
        <CarouselSlider items={products} />
      </View>
      <View style={styles.separator} />
      <CategoryText
        leftText="Available Products"
        rightText="See all"
        onPress={() => {
          navigation.navigate("Search");
        }}
      />
      <View style={styles.spacing} />
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

// Stylesheet for the HomeScreen component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    width: "100%",
    backgroundColor: "#ccc",
    marginVertical: 3,
  },
  carouselContainer: {
    height: screenHeight / 3,
  },
  spacing: {
    marginTop: 4,
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
});

export default HomeScreen;
