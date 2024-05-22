import React, { createContext, useState, useContext } from "react";

export const FavoritesContext = createContext({
  favorites: [],
  addFavorite: (productId) => {},
  removeFavorite: (productId) => {},
});

export const useFavorites = () => useContext(FavoritesContext);

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const addFavorite = (productId) => {
    setFavorites((prevFavorites) => [...prevFavorites, productId]);
  };

  const removeFavorite = (productId) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((id) => id !== productId)
    );
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
