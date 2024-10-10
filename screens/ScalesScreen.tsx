import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

const ScalesScreen: React.FC = () => {
  const [grams, setGrams] = useState("");
  const [convertedWeight, setConvertedWeight] = useState("");

  const convertWeight = () => {
    const g = parseFloat(grams);
    const pounds = g / 453.59237;
    const ounces = (pounds - Math.floor(pounds)) * 16;
    setConvertedWeight(`${Math.floor(pounds)}lb ${ounces.toFixed(1)}oz`);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter weight in grams"
        keyboardType="numeric"
        value={grams}
        onChangeText={setGrams}
      />

      <TouchableOpacity style={styles.saveButton} onPress={convertWeight}>
        <Text style={styles.saveButtonText}>Convert</Text>
      </TouchableOpacity>

      {/* Display converted weight in a nice box */}
      {convertedWeight !== "" && (
        <View style={styles.resultBox}>
          <Text style={styles.resultText}>{convertedWeight}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginVertical: 8,
    padding: 8,
  },
  saveButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 15,
    marginVertical: 20,
    borderRadius: 5,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  resultBox: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  resultText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default ScalesScreen;
