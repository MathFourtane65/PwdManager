import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { initDb } from './src/database/database';
import './src/i18n';
import AppNavigation from './src/navigation/AppNavigation';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';



//init SQLITE db
initDb();

export default function App() {
  return (
    <>
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>

        <AppNavigation />

      </SafeAreaView>
    </SafeAreaProvider>
    </>
  );
}