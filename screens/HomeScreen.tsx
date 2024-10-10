import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StackNavigationProp } from "@react-navigation/stack";
import { Recipe } from "./RecipeListScreen";
import { useTheme } from '@/statemanagement/ThemeContext'; // Adjust the import path as per your project structure

type RootStackParamList = {
  Home: undefined;
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">;

type Props = {
  navigation: HomeScreenNavigationProp;
  route: {
    params: {
      user: {
        name: string;
        email: string;
      };
    };
  };
};

const HomeScreen: React.FC<Props> = ({ navigation, route }) => {

  const { darkMode } = useTheme(); // Access the darkMode state from the context
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [currentUser, setCurrentUser] = useState<{
    name: string;
    email: string;
  }>({ name: "", email: "" });

  const fetchData = async () => {
    try {
      const savedRecipes = await AsyncStorage.getItem("recipes");
      if (savedRecipes) {
        setRecipes(JSON.parse(savedRecipes));
      }

      const userString = await AsyncStorage.getItem("currentUser");
      if (userString) {
        const user = JSON.parse(userString);
        setCurrentUser(user);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Auto-reload effect
  useEffect(() => {
    const interval = setInterval(() => {
      fetchData();
    }, 5000); // Adjust the interval as needed, here it reloads every 5 seconds

    return () => clearInterval(interval); // Cleanup function to clear interval on unmount
  }, []);

  return (
    <View style={[styles.container, darkMode && styles.darkContainer]}>
      <Text style={[styles.title, darkMode && styles.darkTitle]}>Main Menu</Text>
      <Text>Welcome, {currentUser.name}</Text>
      <Text>Email: {currentUser.email}</Text>
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.gridContainer}>
          {recipes.map((recipe, index) => (
            <TouchableOpacity
              key={index}
              style={styles.cardContainer}
              onPress={() => navigation.navigate("RecipeDetail", { recipe })}
            >
              {recipe.image ? (
                <Image
                  source={{ uri: recipe.image }}
                  style={styles.recipeImage}
                />
              ) : (
                <View style={styles.placeholderImage} />
              )}
              <Text style={styles.recipeTitle}>{recipe.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },

  darkContainer: {
    backgroundColor: '#333',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000',
  },
  darkTitle: {
    color: '#fff',
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  cardContainer: {
    width: "48%",
    aspectRatio: 1,
    marginBottom: 16,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    elevation: 2,
    padding: 10,
  },
  recipeImage: {
    width: "100%",
    height: "70%",
    borderRadius: 10,
  },
  placeholderImage: {
    width: "100%",
    height: "70%",
    backgroundColor: "#ccc",
    borderRadius: 10,
  },
  recipeTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 5,
  },
});

export default HomeScreen;
