import React from "react";
import { View, Text, FlatList, Image, Pressable } from "react-native";
import { useCart } from "../../store/cart-context";
import { Ionicons } from "@expo/vector-icons";
import CustomButton from "../../components/customButton";
import { Colors } from "../../constants/styles";

/**
 * The CartScreen component displays the products added to the cart.
 * It allows users to adjust the quantity of products and remove them from the cart.
 */
function CartScreen() {
  const { cart, updateQuantity, removeFromCart } = useCart();

  // Calculate the total amount of the cart
  const totalAmount = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <View style={{ flex: 1, padding: 16, backgroundColor: "white" }}>
      {/* Render the list of cart items */}
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

      {/* Divider */}
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#D1D5DB",
          marginVertical: 10,
        }}
      />

      {/* Total amount and Checkout button */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            textAlign: "center",
            fontFamily: "urbanist-medium",
          }}
        >
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

/**
 * The CartItem component represents an individual item in the cart list.
 * It displays product details, allows adjusting quantity, and removing the product from the cart.
 * @param {Object} product - The product object containing details like id, title, image, price, and quantity.
 * @param {Function} updateQuantity - Function to update the quantity of the product.
 * @param {Function} removeFromCart - Function to remove the product from the cart.
 */
function CartItem({ product, updateQuantity, removeFromCart }) {
  return (
    <View
      style={{
        marginBottom: 20,
        padding: 16,
        borderWidth: 1,
        borderColor: "#D1D5DB",
        borderRadius: 8,
      }}
    >
      <View style={{ flexDirection: "row" }}>
        <Image
          source={{ uri: product.image }}
          style={{
            marginRight: 12,
            width: 100,
            height: 100,
            resizeMode: "contain",
          }}
        />
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 8 }}>
            {product.title}
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 16, marginRight: 20 }}>
              ${product.price.toFixed(2)}
            </Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Pressable
                style={{
                  backgroundColor: "#E5E7EB",
                  borderRadius: 20,
                  padding: 8,
                  marginRight: 8,
                }}
                onPress={() =>
                  updateQuantity(product.id, Math.max(1, product.quantity - 1))
                }
              >
                <Ionicons name="remove-outline" size={24} color="black" />
              </Pressable>
              <Text style={{ fontSize: 18, marginHorizontal: 8 }}>
                {product.quantity}
              </Text>
              <Pressable
                style={{
                  backgroundColor: "#E5E7EB",
                  borderRadius: 20,
                  padding: 8,
                  marginLeft: 8,
                }}
                onPress={() => updateQuantity(product.id, product.quantity + 1)}
              >
                <Ionicons name="add-outline" size={24} color="black" />
              </Pressable>
            </View>
          </View>
        </View>
      </View>
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#D1D5DB",
          marginVertical: 10,
        }}
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
            fontFamily: "urbanist-medium",
          }}
        >
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
