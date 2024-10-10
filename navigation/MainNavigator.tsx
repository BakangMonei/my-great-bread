import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import RecipeListScreen from "../screens/RecipeListScreen";
import RecipeDetailScreen from "../screens/RecipeDetailScreen";
import AddRecipeScreen from "../screens/AddRecipeScreen";
import FavoritesScreen from "../screens/FavoritesScreen";
import ScalesScreen from "../screens/ScalesScreen";
import PreferencesScreen from "../screens/PreferencesScreen";
import SplashScreen from "../screens/SplashScreen";
import { Ionicons } from "@expo/vector-icons";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const RecipesStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="RecipeList" component={RecipeListScreen} />
    <Stack.Screen name="RecipeDetail" component={RecipeDetailScreen} />
    <Stack.Screen name="AddRecipe" component={AddRecipeScreen} />
  </Stack.Navigator>
);

const MainNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName;

        if (route.name === "Home") {
          iconName = "home-outline";
        } else if (route.name === "Recipes") {
          iconName = "book-outline";
        } else if (route.name === "Favorites") {
          iconName = "heart-outline";
        } else if (route.name === "Scales") {
          iconName = "analytics-outline";
        } else if (route.name === "Preferences") {
          iconName = "settings-outline";
        }

        // You can return any component that you like here!
        return <Ionicons name={iconName} size={size} color={color} />;
      },
    })}
    tabBarOptions={{
      activeTintColor: "green",
      inactiveTintColor: "black",
    }}
  >
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Recipes" component={RecipesStack} />
    <Tab.Screen name="Favorites" component={FavoritesScreen} />
    <Tab.Screen name="Scales" component={ScalesScreen} />
    <Tab.Screen name="Preferences" component={PreferencesScreen} />
  </Tab.Navigator>
);

export default MainNavigator;
