import React, {useState} from 'react';
import { View, Text, TextInput, Button, Platform, StyleSheet, Alert, KeyboardAvoidingView, Image, ToastAndroid, Keyboard, TouchableOpacity, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { createPassword } from '../services/PasswordService';


const AddPasswordScreen = () => {
  const srcImage = require('../../assets/image_cadenas.png');
  const { t, i18n } = useTranslation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [service, setService] = useState('');

  const handleAddPassword = async () => {
    if (!username || !password || !service) {
      Alert.alert('ERROR', 'required');
      console.log(srcImage);
      return;
    }
    try {
      await createPassword(username, password, service);
     // Alert.alert('success', 'ajouté');
     Keyboard.dismiss();
     ToastAndroid.showWithGravity('Mot de passe ajouté !', ToastAndroid.SHORT, ToastAndroid.TOP)
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
    <View style={styles.container}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
      <Text style={styles.title}>Ajouter un MDP</Text>
      <Image source={srcImage} style={styles.image}/>

      <View style={{flex: 1}}> 
    <View style={styles.form}>

      {/* UTILISER DES LABELS PLUTOT QUE DES PLACEHOLDER BUG POUR LE CHAMP PASSWORD LORSQUE CHANGEMENT DE LANGUE */}
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={setUsername}
        placeholder={t('placeholderUsername')}
        autoCapitalize='none'
      />

      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder={t('placeholderPassword')}
        secureTextEntry
      />

      <TextInput
        style={styles.input}
        value={service}
        onChangeText={setService}
        placeholder={t('placeholderService')}
        autoCapitalize='none'
      />
{/* 
      <Button
        title={t('add')}
        onPress={handleAddPassword}
        style={styles.button}
      /> */}

<TouchableOpacity onPress={handleAddPassword} style={styles.button}>
    <Text style={{color:'#ffffff', textAlign:'center'}}>{t('add')}</Text>
</TouchableOpacity>
      </View>
      </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAF0',
  },
  input : {
    borderWidth: 1,
    borderColor: '#8A7967',
    margin: 10,
    marginBottom: 30,
    padding: 3,
    textAlign: 'center',
    borderRadius: 10,
  },
  button: {
    //width:'50%',
    backgroundColor: '#8A7967',
    borderRadius: 30
  },
  title:{
    fontSize: 25,
    textAlign: 'center',
    margin: 10,
    color: '#8A7967',
    fontWeight:'500'
  },
  form: {
    margin: 10,
    borderColor: '#8A7967',
    borderWidth: 3,
    padding: 15,
    borderTopRightRadius: 30,
    borderBottomLeftRadius: 30,
  },
  image: {
    width: 200, // Définissez la largeur souhaitée
    height: 200, // et la hauteur de votre image,
    alignSelf: 'center'
  },
});

export default AddPasswordScreen;
