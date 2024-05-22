import React, { useState } from "react";
import { View, Text, Image, Pressable } from "react-native";
import { useCart } from "../store/cart-context";
import { Ionicons } from "@expo/vector-icons";
import CustomButton from "./customButton";
import { Colors } from "../constants/styles";
import IconButton from "./iconButton";
import { useFavorites } from "../store/favourite-context";

const ProductItem = React.memo(({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { favorites, addFavorite, removeFavorite } = useFavorites();
  const isFavorite = favorites.includes(product.id);

  const toggleFavorite = () => {
    if (isFavorite) {
      removeFavorite(product.id);
    } else {
      addFavorite(product.id);
    }
  };
  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  return (
    <View className="mb-4 p-5 border border-gray-300 rounded-lg align-center items-center relative">
      <Image
        source={{ uri: product.image }}
        style={{
          width: "100%",
          height: 200,
          resizeMode: "contain",
        }}
      />
      <View className="absolute top-5 right-5">
        <IconButton
          onPress={() => {
            toggleFavorite();
          }}
          icon={isFavorite ? "heart" : "heart-outline"}
          color={isFavorite ? "red" : "black"}
        />
      </View>
      <Text className="text-xl font-bold mt-4 font-urbanist-medium">
        {product.title}
      </Text>
      <View className="h-px w-full bg-gray-400 my-4" />
      <View className="flex flex-row justify-between w-full items-center mb-3">
        <Text className="text-lg">Price: ${product.price.toFixed(2)}</Text>

        <View className="flex flex-row items-center">
          <Pressable
            className="bg-gray-200 rounded-full p-2 cursor-pointer mr-2"
            onPress={() =>
              setQuantity((prevQuantity) => Math.max(1, prevQuantity - 1))
            }
          >
            <Ionicons name="remove-outline" size={24} color="black" />
          </Pressable>
          <View className="bg-gray-200 rounded-md p-2 px-4">
            <Text className="text-lg">{quantity}</Text>
          </View>
          <Pressable
            className="bg-gray-200 rounded-full p-2 cursor-pointer ml-2"
            onPress={() => setQuantity((prevQuantity) => prevQuantity + 1)}
          >
            <Ionicons name="add-outline" size={24} color="black" />
          </Pressable>
        </View>
      </View>
      <CustomButton
        height={45}
        text="Add to Cart"
        onPress={handleAddToCart}
        color={Colors.primary}
        borderRadius={10}
        textColor="#FFFFFF"
      />
    </View>
  );
});

export default ProductItem;
