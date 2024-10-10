import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated, Easing } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Svg, { Path } from "react-native-svg";

const SplashScreen: React.FC = () => {
  const navigation = useNavigation();
  const bounceValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate("LoginPage");
    }, 3000);

    // Start bouncing animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(bounceValue, {
          toValue: 1,
          duration: 500,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(bounceValue, {
          toValue: 0,
          duration: 500,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ])
    ).start();

    return () => clearTimeout(timer);
  }, [bounceValue, navigation]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.cookieContainer,
          {
            transform: [
              {
                translateY: bounceValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -100],
                }),
              },
            ],
          },
        ]}
      >
        <Svg height="100" width="100" viewBox="0 0 100 100">
          <Path
            d="M50 0 
               Q20 20 20 50
               Q20 80 50 100
               Q80 80 80 50
               Q80 20 50 0
               Z"
            fill="#D2691E" // Cookie color
          />
        </Svg>
      </Animated.View>
      <Text style={styles.title}>Bread Recipe</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  cookieContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333333",
  },
});

export default SplashScreen;
