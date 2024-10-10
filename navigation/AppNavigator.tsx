// AppNavigator.tsx
import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from "@/screens/SplashScreen";
import MainNavigator from "./MainNavigator"; // You may need to adjust this import based on your folder structure
import LoginScreen from "@/screens/LoginScreen";
import RegistrationScreen from "@/screens/RegistrationScreen";
import ForgotPasswordScreen from "@/screens/ForgotPasswordScreen";
import { AppContext } from "@/statemanagement/AppContext";
import FavoritesScreen from "@/screens/FavoritesScreen";
import ChangePasswordScreen from "@/screens/ChangePasswordScreen";

const Stack = createNativeStackNavigator();

const AppNavigator: React.FC = () => {
  const { state } = useContext(AppContext);

  return (
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen
        name="Splash"
        component={SplashScreen}
        options={{ headerShown: false }}
      />
      {state.isLoggedIn ? (
        <Stack.Screen
          name="MainNavigator" // Change this to "MainNavigator" or any other appropriate name
          component={MainNavigator}
          options={{ headerShown: false }}
        />
      ) : (
        <>
    
        </>
      )}
      <Stack.Screen
            name="LoginPage"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ForgotPassword"
            component={ForgotPasswordScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="RegistrationPage"
            component={RegistrationScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Main"
            component={MainNavigator}
            options={{ headerShown: false }}
          />
      <Stack.Screen
        name="ChangePassword"
        component={ChangePasswordScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
            name="FavoriteList"
            component={FavoritesScreen}
            options={{ headerShown: true }}
          />
    </Stack.Navigator>
  );
};

export default AppNavigator;
