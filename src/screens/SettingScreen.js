import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { useTranslation } from 'react-i18next';


const SettingScreen = () => {
  const { t, i18n } = useTranslation();
//   const [selectedLanguage, setSelectedLanguage] = useState();

  return (
    <View style={styles.container}>
      <Text>{t('chooseLanguage')}</Text>
      <Picker
        selectedValue={i18n.language}
        onValueChange={(itemValue) => i18n.changeLanguage(itemValue)}
      >
        <Picker.Item label="English" value="en" />
        <Picker.Item label="Français" value="fr" />
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAF0',
   // alignItems: 'center',
    justifyContent: 'center',
  },
});


export default SettingScreen;
