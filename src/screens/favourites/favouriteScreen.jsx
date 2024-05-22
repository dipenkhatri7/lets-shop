import React, { useContext, useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { FavoritesContext } from "../../store/favourite-context";
import { fetchProducts } from "../../utils/http";
import ProductItem from "../../components/productItem";

const FavoriteScreen = () => {
  const { favorites } = useContext(FavoritesContext);
  const [products, setProducts] = useState([]);

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
          favoriteProducts.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))
        )}
      </View>
    </ScrollView>
  );
};

export default FavoriteScreen;
