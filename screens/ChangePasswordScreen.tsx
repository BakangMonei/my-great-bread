import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useRoute } from "@react-navigation/native";

const ChangePasswordScreen: React.FC = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigation = useNavigation();
  const route = useRoute();
  const { email } = route.params as { email: string };

  const changePassword = async () => {
    try {
      // Validate password and confirm password
      if (!password || !confirmPassword) {
        throw new Error("Please enter password and confirm password.");
      }
      if (password !== confirmPassword) {
        throw new Error("Passwords do not match.");
      }

      // Get users from AsyncStorage
      const usersString = await AsyncStorage.getItem("users");
      if (!usersString) {
        throw new Error("Users data not found.");
      }
      const users = JSON.parse(usersString);

      // Find the user by email
      const userIndex = users.findIndex((user) => user.email === email);
      if (userIndex === -1) {
        throw new Error("User not found.");
      }

      // Update the user's password
      users[userIndex].password = password;

      // Save the updated users back to AsyncStorage
      await AsyncStorage.setItem("users", JSON.stringify(users));

      // Show success message and navigate back to the login page
      Alert.alert("Success", "Password changed successfully.");
      navigation.navigate("LoginPage");
    } catch (error) {
      console.error(error);
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Change Password</Text>

      <TextInput
        placeholder="New Password"
        placeholderTextColor="#666"
        style={styles.input}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TextInput
        placeholder="Confirm Password"
        placeholderTextColor="#666"
        style={styles.input}
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      <TouchableOpacity style={styles.button} onPress={changePassword}>
        <Text style={styles.buttonText}>Change Password</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#ffffff",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333333",
  },
  input: {
    height: 50,
    borderColor: "#cccccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#4CAF50",
    paddingVertical: 15,
    marginVertical: 20,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ChangePasswordScreen;
