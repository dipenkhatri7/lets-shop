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
 * Component for the Home Screen of the application.
 * Displays best offers, carousel of products, and available products.
 * Users can navigate to the Search Screen to view all available products.
 * @param {object} navigation - Navigation object used to navigate between screens.
 * @returns {JSX.Element} - Home Screen component.
 */
function HomeScreen({ navigation }) {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();
  const [isLoading, setIsLoading] = useState(true);

  // Fetch products from API when the component mounts
  useEffect(() => {
    fetchData();
  }, []);

  // Function to fetch products from API
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

  // Render loading screen while products are being fetched
  if (isLoading) {
    return <Loading message={"Loading products..."} />;
  }

  return (
    <ScrollView style={styles.container}>
      {/* Display best offers */}
      <CategoryText
        leftText="Best Offers"
        imageSourcePrototype={require("../../../assets/images/best_picks.png")}
        onPress={() => {}}
      />
      <View className="h-px w-full bg-gray-400 mb-3" />
      {/* Display carousel of products */}
      <View style={styles.carouselContainer}>
        <CarouselSlider items={products} />
      </View>
      <View className="h-px w-full bg-gray-400 mt-7 mb-2" />
      {/* Display available products */}
      <CategoryText
        leftText="Available Products"
        rightText="See all"
        onPress={() => {
          navigation.navigate("Search");
        }}
      />
      <View className="mt-4" />
      <View style={styles.listContainer}>
        {/* Display available products as a list */}
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

// Styles for the HomeScreen component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  carouselContainer: {
    height: screenHeight / 3,
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
});

export default HomeScreen;
