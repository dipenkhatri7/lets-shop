import { createContext, useState } from "react";

/**
 * Context for managing authentication state.
 */

const AuthContext = createContext({
  token: "", // Authentication token
  isAuthenticated: false, // Indicates if user is authenticated
  authenticate: (token) => {}, // Function to authenticate user
  logout: () => {}, // Function to logout user
});

/**
 * Provider component for AuthContext.
 *
 * Manages authentication state and provides authentication related functions.
 * @param {object} children - React components to be wrapped by the provider
 * @returns {JSX.Element} Provider component for AuthContext
 */

function AuthContextProvider({ children }) {
  const [authToken, setAuthToken] = useState(); // State for authentication token

  // Function to authenticate user
  function authenticate(token) {
    setAuthToken(token); // Set authentication token
  }

  // Function to logout user
  function logout() {
    setAuthToken(null); // Clear authentication token
  }

  // Value object to be provided by the context
  const value = {
    token: authToken, // Authentication token
    isAuthenticated: !!authToken, // Check if user is authenticated
    authenticate: authenticate, // Authenticate user function
    logout: logout, // Logout user function
  };

  // Render AuthContext provider with value and children
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export { AuthContext, AuthContextProvider }; // Export AuthContext and AuthContextProvider
