import AsyncStorage from "@react-native-async-storage/async-storage";

// Function to check if the user is opening the app for the first time
export const isFirstTimeUser = async () => {
  try {
    const firstTime = await AsyncStorage.getItem("firstTimeUser");
    // If the value is null, it means the user is opening the app for the first time
    console.log("From storage.js", firstTime);
    return firstTime === null;
  } catch (error) {
    console.error("Error checking first time user:", error);
    return false; // Fallback to false in case of error
  }
};

// Function to set the flag that the user has completed the onboarding
export const setFirstTimeUser = async () => {
  try {
    await AsyncStorage.setItem("firstTimeUser", "false");
  } catch (error) {
    console.error("Error setting first time user:", error);
  }
};
