import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import * as ImagePicker from "expo-image-picker";

type RootStackParamList = {
  RecipeDetail: { recipe: Recipe };
};

type RecipeDetailScreenRouteProp = RouteProp<
  RootStackParamList,
  "RecipeDetail"
>;
type RecipeDetailScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "RecipeDetail"
>;

type Recipe = {
  id: number;
  title: string;
  description: string;
  image: string;
};

type Props = {
  route: RecipeDetailScreenRouteProp;
  navigation: RecipeDetailScreenNavigationProp;
};

const RecipeDetailScreen: React.FC<Props> = ({ route, navigation }) => {
  const { recipe } = route.params;
  const [isFavorite, setIsFavorite] = useState(false);
  const [title, setTitle] = useState(recipe.title);
  const [description, setDescription] = useState(recipe.description);
  const [image, setImage] = useState(recipe.image);

  useEffect(() => {
    const checkFavoriteStatus = async () => {
      try {
        const savedFavorites = await AsyncStorage.getItem("favorites");
        const favorites: Recipe[] = savedFavorites
          ? JSON.parse(savedFavorites)
          : [];
        const exists = favorites.some(
          (favRecipe) => favRecipe.id === recipe.id
        );
        setIsFavorite(exists);
      } catch (error) {
        console.error(error);
      }
    };

    checkFavoriteStatus();
  }, [recipe.id]);

  const addToFavorites = async () => {
    try {
      const savedFavorites = await AsyncStorage.getItem("favorites");
      let favorites: Recipe[] = savedFavorites
        ? JSON.parse(savedFavorites)
        : [];
      const exists = favorites.some((favRecipe) => favRecipe.id === recipe.id);

      if (!exists) {
        favorites.push({ ...recipe, title, description, image });
        await AsyncStorage.setItem("favorites", JSON.stringify(favorites));
        setIsFavorite(true);
        Alert.alert("Success", "Recipe added to favorites");
        navigation.navigate("FavoriteList");
      } else {
        Alert.alert("Warning", "Recipe already in favorites");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Something went wrong while adding to favorites");
    }
  };

  const saveRecipe = async () => {
    try {
      const savedRecipes = await AsyncStorage.getItem("recipes");
      let recipes: Recipe[] = savedRecipes ? JSON.parse(savedRecipes) : [];
      const index = recipes.findIndex((rec) => rec.id === recipe.id);
      if (index !== -1) {
        recipes[index] = { ...recipe, title, description, image };
        await AsyncStorage.setItem("recipes", JSON.stringify(recipes));
        Alert.alert("Success", "Recipe updated successfully");
        navigation.goBack();
      } else {
        Alert.alert("Error", "Recipe not found");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Something went wrong while saving the recipe");
    }
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.imageContainer}>
        {image ? (
          <Image source={{ uri: image }} style={styles.image} />
        ) : (
          <Text style={styles.noImageText}>No Image Available</Text>
        )}
        <TouchableOpacity onPress={pickImage}>
          <Text style={styles.changeImageText}>Change Image</Text>
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={[styles.input, styles.descriptionInput]}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
      />
      <TouchableOpacity style={styles.saveButton} onPress={saveRecipe}>
        <Text style={styles.saveButtonText}>Save Changes</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.favoritesButton}
        onPress={addToFavorites}
        disabled={isFavorite}
      >
        <Text style={styles.favoritesButtonText}>
          {isFavorite ? "Saved to Favorites" : "Add to Favorites"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  imageContainer: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 16,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  noImageText: {
    color: "#888",
    fontSize: 16,
  },
  changeImageText: {
    color: "#007BFF",
    marginTop: 10,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginVertical: 8,
    padding: 8,
  },
  descriptionInput: {
    height: 120,
  },
  saveButton: {
    backgroundColor: "#2196F3",
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 16,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  favoritesButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 16,
    opacity: (props) => (props.disabled ? 0.5 : 1),
  },
  favoritesButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default RecipeDetailScreen;
