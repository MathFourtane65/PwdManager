// Dans src/screens/HomeScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';


const HomeScreen = () => {
  const { t, i18n } = useTranslation();

  return (
    <View style={styles.container}>
      <Text>ADD PASSWORD SCREEN</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAF0',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HomeScreen;
