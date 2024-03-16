import React, {useState} from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ToastAndroid, Keyboard } from 'react-native';
import { useTranslation } from 'react-i18next';
import { createPassword } from '../services/PasswordService';


const AddPasswordScreen = () => {
  const { t, i18n } = useTranslation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [service, setService] = useState('');

  const handleAddPassword = async () => {
    if (!username || !password || !service) {
      Alert.alert('ERROR', 'required');
      return;
    }
    try {
      await createPassword(username, password, service);
     // Alert.alert('success', 'ajouté');
     Keyboard.dismiss();
     ToastAndroid.showWithGravity('Mot de passe ajouté avec succès !', ToastAndroid.SHORT, ToastAndroid.TOP)
      // Effacer les champs après l'ajout
      setUsername('');
      setPassword('');
      setService('');
    } catch (error) {
      Alert.alert('error', 'failed');
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>ADD PASSWORD SCREEN</Text>

      <TextInput
        style={styles.input}
        value={username}
        onChangeText={setUsername}
        placeholder={t('username')}
        autoCapitalize='none'
      />

      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder={t('password')}
        secureTextEntry
      />

      <TextInput
        style={styles.input}
        value={service}
        onChangeText={setService}
        placeholder={t('service')}
        autoCapitalize='none'
      />

      <Button
        title={t('add')}
        onPress={handleAddPassword}
      />
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
  input : {
    borderWidth: 1,
    borderColor: '#8A7967',
    margin: 5,
    padding: 3,
    textAlign: 'center',
    borderRadius: 10
  }
});

export default AddPasswordScreen;
