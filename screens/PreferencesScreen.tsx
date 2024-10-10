import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch } from 'react-native';

const PreferencesScreen: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const [fontFamily, setFontFamily] = useState('System');

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const increaseFontSize = () => {
    setFontSize(fontSize + 1);
  };

  const decreaseFontSize = () => {
    if (fontSize > 12) {
      setFontSize(fontSize - 1);
    }
  };

  const toggleFontFamily = () => {
    setFontFamily(fontFamily === 'System' ? 'Arial' : 'System');
  };

  return (
    <View style={[styles.container, darkMode && styles.darkContainer]}>
      <Text style={[styles.title, darkMode && styles.darkTitle]}>Preferences</Text>

      <View style={styles.option}>
        <Text style={[styles.optionText, darkMode && styles.darkOptionText]}>Dark Mode</Text>
        <Switch value={darkMode} onValueChange={toggleDarkMode} />
      </View>

      <View style={styles.option}>
        <Text style={[styles.optionText, darkMode && styles.darkOptionText]}>Font Size</Text>
        <TouchableOpacity onPress={decreaseFontSize}>
          <Text style={[styles.buttonText, darkMode && styles.darkButtonText]}>-</Text>
        </TouchableOpacity>
        <Text style={[styles.fontSizeText, darkMode && styles.darkFontSizeText]}>{fontSize}</Text>
        <TouchableOpacity onPress={increaseFontSize}>
          <Text style={[styles.buttonText, darkMode && styles.darkButtonText]}>+</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.option}>
        <Text style={[styles.optionText, darkMode && styles.darkOptionText]}>Font Family</Text>
        <TouchableOpacity onPress={toggleFontFamily}>
          <Text style={[styles.fontFamilyText, darkMode && styles.darkFontFamilyText]}>{fontFamily}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  optionText: {
    flex: 1,
    fontSize: 18,
    color: '#000',
  },
  darkOptionText: {
    color: '#fff',
  },
  fontSizeText: {
    fontSize: 18,
    marginHorizontal: 10,
    color: '#000',
  },
  darkFontSizeText: {
    color: '#fff',
  },
  buttonText: {
    fontSize: 20,
    color: '#007BFF',
  },
  darkButtonText: {
    color: '#fff',
  },
  fontFamilyText: {
    fontSize: 18,
    color: '#007BFF',
  },
  darkFontFamilyText: {
    color: '#fff',
  },
});

export default PreferencesScreen;
