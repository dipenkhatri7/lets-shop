import React, { useContext, useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { FavoritesContext } from "../../store/favourite-context";
import { fetchProducts } from "../../utils/http";
import ProductItem from "../../components/productItem";

/**
 * Component for displaying favorite products.
 * Fetches and displays products marked as favorites.
 */
const FavoriteScreen = () => {
  // Accessing the favorites context to get the list of favorite product IDs
  const { favorites } = useContext(FavoritesContext);

  // State to store the fetched products
  const [products, setProducts] = useState([]);

  // Fetch products from the server when the component mounts
  useEffect(() => {
    fetchData();
  }, []);

  /**
   * Function to fetch products from the server.
   * Updates the state with the fetched products.
   */
  const fetchData = async () => {
    try {
      const data = await fetchProducts();
      setProducts(data);
    } catch (error) {
      console.error(error);
    }
  };

  // Filter products to get only the favorite ones
  const favoriteProducts = products.filter((product) =>
    favorites.includes(product.id)
  );

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ padding: 10 }}>
        {favoriteProducts.length === 0 ? (
          <Text style={{ textAlign: "center", marginTop: 20 }}>
            No favorite products
          </Text>
        ) : (
          // Map through the favorite products and render ProductItem component for each
          favoriteProducts.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))
        )}
      </View>
    </ScrollView>
  );
};

export default FavoriteScreen;
