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
  Favorites: undefined;
  RecipeDetail: { recipe: Recipe };
};

type FavoritesScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Favorites"
>;

type Recipe = {
  id: number;
  title: string;
  description: string;
  image: string;
};

type Props = {
  navigation: FavoritesScreenNavigationProp;
};

const FavoritesScreen: React.FC<Props> = ({ navigation }) => {
  const [favorites, setFavorites] = useState<Recipe[]>([]);

  const fetchFavorites = async () => {
    try {
      const savedFavorites = await AsyncStorage.getItem("favorites");
      if (savedFavorites) {
        setFavorites(JSON.parse(savedFavorites));
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      fetchFavorites();
    }, 5000); // Adjust the interval as needed, here it reloads every 5 seconds

    // Cleanup function to clear the interval on unmount
    return () => clearInterval(interval);
  }, []);

  const removeFromFavorites = async (recipeId: number) => {
    try {
      const updatedFavorites = favorites.filter(
        (recipe) => recipe.id !== recipeId
      );
      await AsyncStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      setFavorites(updatedFavorites);
      Alert.alert("Success", "Recipe removed from favorites");
    } catch (error) {
      console.error(error);
    }
  };

  const handleShare = (recipe: Recipe) => {
    Share.share({
      message: `${recipe.title}\n\n${recipe.description}`,
    });
  };

  return (
    <View style={styles.container}>
      <SwipeListView
        data={favorites}
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
              onPress={() => handleShare(item)}
            >
              <Text style={styles.backTextWhite}>Share</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.backRightBtn, styles.backRightBtnRight]}
              onPress={() => removeFromFavorites(item.id)}
            >
              <Text style={styles.backTextWhite}>Remove</Text>
            </TouchableOpacity>
          </View>
        )}
        leftOpenValue={0}
        rightOpenValue={-150}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
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
  rowBack: {
    alignItems: "center",
    backgroundColor: "#DDD",
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingRight: 15,
  },
  backRightBtn: {
    alignItems: "center",
    justifyContent: "center",
    width: 75,
    height: "100%",
    backgroundColor: "red",
  },
  backRightBtnLeft: {
    backgroundColor: "green",
  },
  backRightBtnRight: {
    backgroundColor: "red",
  },
  backTextWhite: {
    color: "#FFF",
  },
});

export default FavoritesScreen;
