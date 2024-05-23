import React, { createContext, useState, useContext } from "react";

// Create context for managing favorites state
export const FavoritesContext = createContext();

// Custom hook for accessing favorites context
export const useFavorites = () => useContext(FavoritesContext);

/**
 * Provider component for FavoritesContext.
 * Manages favorites state and provides functions to add and remove products from favorites.
 * @param {object} children - React components to be wrapped by the provider
 * @returns {JSX.Element} Provider component for FavoritesContext
 */

export const FavoritesProvider = ({ children }) => {
  // State for managing favorite products
  const [favorites, setFavorites] = useState([]);

  // Function to add a product to favorites
  const addFavorite = (productId) => {
    setFavorites((prevFavorites) => [...prevFavorites, productId]);
  };

  // Function to remove a product from favorites
  const removeFavorite = (productId) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((id) => id !== productId)
    );
  };

  // Render FavoritesContext provider with value and children
  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
