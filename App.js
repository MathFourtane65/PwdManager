import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { initDb, deleteDb } from './src/database/database';
import './src/i18n';
import AppNavigation from './src/navigation/AppNavigation';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';



//init SQLITE db
initDb();

//delete db
//deleteDb();

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