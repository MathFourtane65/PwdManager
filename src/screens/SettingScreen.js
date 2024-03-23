import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Linking } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useTranslation } from 'react-i18next';

const SettingScreen = () => {
  const { t, i18n } = useTranslation();
  // Version de l'application - Normalement, vous le récupéreriez dynamiquement
  const appVersion = "1.0.0";
  // Nom du développeur
  const developerName = "Mathieu FOURTANE";
  const developerWebSite = "https://mathieu-fourtane.fr"

  const openURL = async (url) => {
    // Vérifiez si l'URL peut être ouverte
    const canOpen = await Linking.canOpenURL(url);

    if (canOpen) {
      await Linking.openURL(url);
    } else {
      console.log('Désolé, cette URL ne peut pas être ouverte.');
    }
  };


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{t('settingsScreenTitle')}</Text>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t('chooseLanguage')}</Text>
        <Picker
          selectedValue={i18n.language}
          onValueChange={(itemValue) => i18n.changeLanguage(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="English" value="en" />
          <Picker.Item label="Français" value="fr" />
        </Picker>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t('about')}</Text>
        <Text style={styles.infoText}>{t('version')}: {appVersion}</Text>
        {/* Ajoutez ici d'autres informations si nécessaire */}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t('developer')}</Text>
        <Text style={styles.infoText}>{developerName}</Text>
        <TouchableOpacity onPress={() => openURL(developerWebSite)}>
          <Text style={styles.link}>{t('website')}</Text>
        </TouchableOpacity>
      </View>


      {/* Ajoutez d'autres sections ici selon vos besoins */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#FAFAF0',
  },
  section: {
    margin: 20,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#FFFFFF', // ou une autre couleur selon votre thème
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 16,
    marginBottom: 5,
  },
  picker: {
    width: '100%',
    backgroundColor: '#E8E8E8', // Couleur de fond pour le picker
  },
  link: {
    color: '#1B95E0', // Couleur typique des liens web, mais choisissez ce qui correspond à votre design
    textDecorationLine: 'underline', // Souligne le texte pour le faire ressembler à un lien
    fontSize: 16,
  },
  title:{
    fontSize: 25,
    textAlign: 'center',
    margin: 10,
    color: '#8A7967',
    fontWeight:'500'
  }
});

export default SettingScreen;
