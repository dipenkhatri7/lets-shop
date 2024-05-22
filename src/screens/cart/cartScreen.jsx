import React from "react";
import { View, Text, FlatList, Image, Pressable } from "react-native";
import { useCart } from "../../store/cart-context";
import { Ionicons } from "@expo/vector-icons";
import CustomButton from "../../components/customButton";
import { Colors } from "../../constants/styles";

function CartScreen() {
  const { cart, updateQuantity, removeFromCart } = useCart();

  const totalAmount = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <View className="flex-1 p-4 bg-white">
      <FlatList
        data={cart}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <CartItem
            product={item}
            updateQuantity={updateQuantity}
            removeFromCart={removeFromCart}
          />
        )}
      />
      <View className="h-px w-full bg-gray-400 my-3" />
      <View className="flex-row justify-between items-center align-center">
        <Text className="text-xl font-bold text-center font-urbanist-medium">
          Total: ${totalAmount.toFixed(2)}
        </Text>
        <CustomButton
          height={45}
          width={150}
          text="Checkout"
          onPress={() => {
            console.log(
              "Checkout with Total amount: $",
              totalAmount.toFixed(2)
            );
          }}
          color={Colors.primary}
          borderRadius={10}
          textColor="#FFFFFF"
        />
      </View>
    </View>
  );
}

function CartItem({ product, updateQuantity, removeFromCart }) {
  return (
    <View className="flex-column mb-4 p-4 border border-gray-300 rounded-lg">
      <View className="flex-row">
        <Image
          source={{ uri: product.image }}
          className="mr-4"
          style={{
            width: 100,
            height: 100,
            resizeMode: "contain",
          }}
        />
        <View className="flex-1">
          <Text className="text-lg font-bold mb-2">{product.title}</Text>
          <View className="flex-row items-center justify-between">
            <Text className="text-base">${product.price.toFixed(2)}</Text>
            <View className="flex-row items-center">
              <Pressable
                className="bg-gray-200 rounded-full p-2 cursor-pointer mr-2"
                onPress={() =>
                  updateQuantity(product.id, Math.max(1, product.quantity - 1))
                }
              >
                <Ionicons name="remove-outline" size={18} color="black" />
              </Pressable>
              <View className="bg-gray-200 rounded-md p-1 px-2">
                <Text className="text-lg">{product.quantity}</Text>
              </View>
              <Pressable
                className="bg-gray-200 rounded-full p-2 cursor-pointer ml-2"
                onPress={() => updateQuantity(product.id, product.quantity + 1)}
              >
                <Ionicons name="add-outline" size={18} color="black" />
              </Pressable>
            </View>
          </View>
        </View>
      </View>
      <View className="h-px w-full bg-gray-400 my-3" />
      <View className="flex-row items-center justify-between">
        <Text className="text-base font-bold font-urbanist-medium">
          Total: ${(product.price * product.quantity).toFixed(2)}
        </Text>
        <CustomButton
          height={30}
          width={108}
          fontSize={16}
          text="Remove"
          onPress={() => removeFromCart(product.id)}
          color={Colors.error700}
          borderRadius={10}
          textColor="#FFFFFF"
        />
      </View>
    </View>
  );
}

export default CartScreen;
