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
import { useNavigation } from "@react-navigation/native";

const ForgotPasswordScreen: React.FC = () => {
  const [email, setEmail] = useState("");
  const navigation = useNavigation();

  const resetPassword = async () => {
    try {
      const usersString = await AsyncStorage.getItem("users");
      if (!usersString) {
        throw new Error("No user data found.");
      }
      const users = JSON.parse(usersString);

      // Check if the entered email exists in the stored user data
      const user = users.find((user) => user.email === email);
      if (!user) {
        throw new Error("User not found.");
      }

      // Navigate to the ChangePasswordScreen with email as a parameter
      navigation.navigate("ChangePassword", { email });
    } catch (error) {
      console.error(error);
      Alert.alert(
        "Error",
        "User not found. Please enter a valid email address."
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forgot Password</Text>

      <TextInput
        placeholder="Email"
        placeholderTextColor="#666"
        style={styles.input}
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <TouchableOpacity style={styles.button} onPress={resetPassword}>
        <Text style={styles.buttonText}>Reset Password</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("LoginPage")}>
        <Text style={styles.link}>Back to Login</Text>
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
  link: {
    color: "#000000",
    textAlign: "center",
    marginTop: 10,
  },
});

export default ForgotPasswordScreen;
