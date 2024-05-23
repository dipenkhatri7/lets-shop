import React, { useState, useEffect } from "react";
import { View, Text, TextInput, FlatList, StyleSheet } from "react-native";
import { fetchProducts } from "../../utils/http";
import ProductItem from "../../components/productItem";

/**
 * Search screen component.
 *
 * Allows users to search for products based on the entered query.
 * @returns {JSX.Element} Search screen component
 */
function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState(""); // State to store search query
  const [products, setProducts] = useState([]); // State to store all products
  const [filteredProducts, setFilteredProducts] = useState([]); // State to store filtered products

  // Fetch products data from server on component mount
  useEffect(() => {
    fetchData();
  }, []);

  // Fetch products data from server
  const fetchData = async () => {
    try {
      const data = await fetchProducts(); // Fetch products
      setProducts(data); // Set products in state
    } catch (error) {
      console.error(error);
    }
  };

  // Filter products based on search query
  useEffect(() => {
    // If search query is empty, reset filtered products
    if (searchQuery.trim() === "") {
      setFilteredProducts([]);
      return;
    }
    // Filter products based on search query
    const filteredResults = products.filter((product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filteredResults); // Set filtered products in state
  }, [searchQuery, products]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search products"
        onChangeText={setSearchQuery} // Update search query state
        value={searchQuery} // Bind search query to input value
      />
      <FlatList
        data={filteredProducts} // Display filtered products
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <ProductItem product={item} />} // Render each product item
        ListEmptyComponent={
          // Rendered when no products match the search query
          <Text style={styles.emptyListText}>No products found</Text>
        }
      />
    </View>
  );
}

// Styles for the SearchScreen component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "white",
  },
  searchInput: {
    fontFamily: "Urbanist-Medium",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 16,
  },
  emptyListText: {
    textAlign: "center",
    color: "#888",
    fontFamily: "Urbanist-Medium",
    fontSize: 16,
  },
});

export default SearchScreen;
