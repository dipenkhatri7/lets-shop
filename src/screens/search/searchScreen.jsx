import React, { useState, useEffect } from "react";
import { View, Text, TextInput, FlatList, StyleSheet } from "react-native";
import { fetchProducts } from "../../utils/http";
import ProductItem from "../../components/productItem";

function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await fetchProducts();
      setProducts(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredProducts([]);
      return;
    }
    const filteredResults = products.filter((product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filteredResults);
  }, [searchQuery, products]);

  return (
    <View className="flex-1 p-4 bg-white">
      <TextInput
        style={styles.searchInput}
        placeholder="Search products"

        onChangeText={setSearchQuery}
        value={searchQuery}
      />
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <ProductItem product={item} />}
        ListEmptyComponent={
          <Text className="text-center text-gray-500 font-urbanist-medium text-base">
            No products found
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  searchInput: {
    fontFamily: "Urbanist-Medium",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 16,
  },
});

export default SearchScreen;
