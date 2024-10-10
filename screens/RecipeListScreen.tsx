import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
  Share,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StackNavigationProp } from "@react-navigation/stack";
import { SwipeListView } from "react-native-swipe-list-view";

type RootStackParamList = {
  RecipeList: undefined;
  RecipeDetail: { recipe: Recipe };
  AddRecipe: { recipe?: Recipe; refreshList: () => void }; // Add refreshList to props
};

type RecipeListScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "RecipeList"
>;

type Recipe = {
  id: number;
  title: string;
  description: string;
  image: string;
};

type Props = {
  navigation: RecipeListScreenNavigationProp;
};

const RecipeListScreen: React.FC<Props> = ({ navigation }) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const savedRecipes = await AsyncStorage.getItem("recipes");
        if (savedRecipes) {
          setRecipes(JSON.parse(savedRecipes));
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchRecipes();

    // Cleanup function to clear any intervals set up by the effect
    return () => {};
  }, []);

  // Function to refresh recipe list
  const refreshRecipeList = async () => {
    try {
      const savedRecipes = await AsyncStorage.getItem("recipes");
      if (savedRecipes) {
        setRecipes(JSON.parse(savedRecipes));
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      refreshRecipeList();
    }, 5000); // Adjust the interval as needed, here it reloads every 5 seconds

    // Cleanup function to clear the interval on unmount
    return () => clearInterval(interval);
  }, []);

  const deleteRecipe = async (recipeId: number) => {
    try {
      const updatedRecipes = recipes.filter((r) => r.id !== recipeId);
      await AsyncStorage.setItem("recipes", JSON.stringify(updatedRecipes));
      setRecipes(updatedRecipes);
    } catch (error) {
      console.error(error);
    }
  };

  const handleShare = (recipe: Recipe) => {
    Share.share({
      message: `${recipe.title}\n\n${recipe.description}`,
    });
  };

  const handleEdit = (recipe: Recipe) => {
    navigation.navigate("AddRecipe", {
      recipe,
      refreshList: refreshRecipeList,
    }); // Pass refreshList to AddRecipe
  };

  return (
    <View style={styles.container}>
      <SwipeListView
        data={recipes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("RecipeDetail", { recipe: item })
            }
          >
            <View style={styles.recipeItem}>
              {item.image ? (
                <Image
                  source={{ uri: item.image }}
                  style={styles.recipeImage}
                />
              ) : (
                <View style={styles.placeholderImage} />
              )}
              <Text style={styles.recipeTitle}>{item.title}</Text>
            </View>
          </TouchableOpacity>
        )}
        renderHiddenItem={({ item }) => (
          <View style={styles.rowBack}>
            <TouchableOpacity
              style={[styles.backRightBtn, styles.backRightBtnLeft]}
              onPress={() => handleEdit(item)}
            >
              <Text style={styles.backTextWhite}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.backRightBtn, styles.backRightBtnCenter]}
              onPress={() => handleShare(item)}
            >
              <Text style={styles.backTextWhite}>Share</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.backRightBtn, styles.backRightBtnRight]}
              onPress={() => {
                Alert.alert(
                  "Delete Recipe",
                  "Are you sure you want to delete this recipe?",
                  [
                    { text: "Cancel", style: "cancel" },
                    {
                      text: "Delete",
                      style: "destructive",
                      onPress: () => deleteRecipe(item.id),
                    },
                  ]
                );
              }}
            >
              <Text style={styles.backTextWhite}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
        leftOpenValue={0}
        rightOpenValue={-225}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() =>
          navigation.navigate("AddRecipe", { refreshList: refreshRecipeList })
        }
      >
        <Text style={styles.addButtonText}>Add Recipe</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  recipeItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    backgroundColor: "#fff",
  },
  recipeTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 16,
  },
  recipeImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  placeholderImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#ccc",
  },
  addButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: "center",
    marginVertical: 20,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  rowBack: {
    alignItems: "center",
    backgroundColor: "#DDD",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 15,
  },
  backRightBtn: {
    alignItems: "center",
    bottom: 0,
    justifyContent: "center",
    position: "absolute",
    top: 0,
    width: 75,
  },
  backRightBtnLeft: {
    backgroundColor: "blue",
    right: 150,
  },
  backRightBtnCenter: {
    backgroundColor: "orange",
    right: 75,
  },
  backRightBtnRight: {
    backgroundColor: "red",
    right: 0,
  },
  backTextWhite: {
    color: "#FFF",
  },
});

export default RecipeListScreen;
