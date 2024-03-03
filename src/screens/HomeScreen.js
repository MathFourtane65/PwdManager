// Dans src/screens/HomeScreen.js
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';


const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text>HOME SCREEN</Text>
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
