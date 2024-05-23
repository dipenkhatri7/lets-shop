import React, { createContext, useContext, useState } from "react";

// Create a context for managing cart state
const CartContext = createContext();

// Custom hook for accessing cart context
export function useCart() {
  return useContext(CartContext);
}

/**
 * Provider component for CartContext.
 * Manages cart state and provides functions to add, update, and remove items from the cart.
 * @param {object} children - React components to be wrapped by the provider
 * @returns {JSX.Element} Provider component for CartContext
 */

export function CartProvider({ children }) {
  // State for managing the cart items
  const [cart, setCart] = useState([]);

  // Function to add items to the cart
  const addToCart = (product, quantity) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        // If the product already exists in the cart, update its quantity
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // If the product is not in the cart, add it with the specified quantity
        return [...prevCart, { ...product, quantity }];
      }
    });
  };

  // Function to update the quantity of an item in the cart
  const updateQuantity = (productId, quantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  // Function to remove an item from the cart
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  // Render CartContext provider with value and children
  return (
    <CartContext.Provider
      value={{ cart, addToCart, updateQuantity, removeFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
}
