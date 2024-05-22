import React, { useContext, useEffect, useState } from "react";
import { NavigationContainer, DrawerActions } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFonts } from "expo-font";
import { AuthContext, AuthContextProvider } from "./src/store/auth-context";
import { isFirstTimeUser, setFirstTimeUser } from "./src/utils/storage";
import Loading from "./src/components/loading";
// import { Button } from "react-native";
import LoginScreen from "./src/screens/Auth/loginScreen";
import SignupScreen from "./src/screens/Auth/signupScreen";
import OnBoarding from "./src/screens/Auth/onboardScreen";
import Onboard from "./src/screens/onBoard/onboard";
import HomeScreen from "./src/screens/home/homeScreen";
import SearchScreen from "./src/screens/search/searchScreen";
import CartScreen from "./src/screens/cart/cartScreen";
import FavouriteScreen from "./src/screens/favourites/favouriteScreen";
import ProfileScreen from "./src/screens/profile/profileScreen";
import HeaderTitle from "./src/components/headerTitle";
import ProfileButton from "./src/components/profileButton";
import BackButton from "./src/components/backButotn";
import { Ionicons } from "@expo/vector-icons";
import { CartProvider } from "./src/store/cart-context";
import { Colors } from "./src/constants/styles";
import { FavoritesProvider } from "./src/store/favourite-context";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Board" component={OnBoarding} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={SignupScreen} />
    </Stack.Navigator>
  );
}

function BottomTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search" size={size} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cart" size={size} color={color} />
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerTintColor: "black",
        drawerContentStyle: { backgroundColor: "white" },
        drawerInactiveTintColor: "#5E5E5E",
        drawerActiveBackgroundColor: "#7E7E7E80",
        drawerActiveTintColor: Colors.primary,
        drawerLabelStyle: { fontFamily: "urbanist-medium" },
      }}
    >
      <Drawer.Screen
        name="HomeTabs"
        component={BottomTabs}
        options={{
          title: "Home",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
          headerRight: () => <ProfileButton />,
          headerTitle: () => <HeaderTitle />,
        }}
      />
      <Drawer.Screen
        name="Favourites"
        component={FavouriteScreen}
        options={{
          title: "Your Favourites",
          headerTitleStyle: { fontFamily: "urbanist-medium", fontSize: 20 },
          drawerIcon: ({ color, size }) => (
            <Ionicons name="star" size={size} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

function AuthenticatedStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitle: () => <HeaderTitle />,
        headerStyle: {
          backgroundColor: "white",
          elevation: 5,
          shadowColor: "black",
          shadowOpacity: 0.08,
          shadowOffset: { width: 0, height: 2 },
          shadowRadius: 5,
        },
        headerTintColor: "white",
      }}
    >
      <Stack.Screen
        name="Drawer"
        component={DrawerNavigator}
        options={({ navigation }) => ({
          headerLeft: () => (
            <Ionicons
              name="menu"
              size={24}
              color="black"
              onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
              style={{ marginLeft: 15 }}
            />
          ),
          headerShown: false,
        })}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerLeft: () => <BackButton />,
        }}
      />
    </Stack.Navigator>
  );
}

function Navigation() {
  const authCtx = useContext(AuthContext);

  return (
    <NavigationContainer>
      {!authCtx.isAuthenticated && <AuthStack />}
      {authCtx.isAuthenticated && <AuthenticatedStack />}
    </NavigationContainer>
  );
}

export default function App() {
  const [isFirstTime, setIsFirstTime] = useState(null);

  useEffect(() => {
    const checkFirstTimeUser = async () => {
      const firstTime = await isFirstTimeUser();
      if (firstTime) {
        setIsFirstTime(true);
      } else {
        setIsFirstTime(false);
      }
    };

    checkFirstTimeUser();
  }, []);

  const [fontsLoaded] = useFonts({
    "urbanist-regular": require("./assets/fonts/Urbanist-Regular.ttf"),
    "urbanist-medium": require("./assets/fonts/Urbanist-Medium.ttf"),
  });

  if (!fontsLoaded) {
    return <Loading message={"Loading fonts..."} />;
  }

  const handleCompleteOnboarding = async () => {
    try {
      await setFirstTimeUser();
      setIsFirstTime(false);
    } catch (error) {
      console.error("Failed to set first time user:", error);
    }
  };

  const clearStorage = async () => {
    try {
      await AsyncStorage.clear();
      setIsFirstTime(true);
    } catch (error) {
      console.error("Failed to clear storage:", error);
    }
  };

  if (isFirstTime === null) {
    return <Loading message={"Checking if user is first time user"} />;
  }

  return (
    <AuthContextProvider>
      <CartProvider>
        <FavoritesProvider>
          <StatusBar style="auto" />
          {isFirstTime ? (
            <Onboard onComplete={handleCompleteOnboarding} />
          ) : (
            <Navigation />
          )}
          {/* <Button title="Clear Storage" onPress={clearStorage} /> */}
        </FavoritesProvider>
      </CartProvider>
    </AuthContextProvider>
  );
}
