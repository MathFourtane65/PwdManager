import React, { useState } from 'react';
import { StyleSheet, View, FlatList, Text, TextInput, TouchableOpacity, Alert, ToastAndroid } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; // Assurez-vous d'avoir installé @expo/vector-icons
import { useFocusEffect } from '@react-navigation/native';
import { getPasswords, deletePassword } from '../services/PasswordService';

const HomeScreen = () => {
  const [passwords, setPasswords] = useState([]);
  const [visiblePasswords, setVisiblePasswords] = useState({}); // Nouvel état pour le suivi de la visibilité

  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;

      const fetchPasswords = async () => {
        try {
          const passwords = await getPasswords();
          if (isActive) {
            setPasswords(passwords);
          }
        } catch (e) {
          console.error(e);
        }
      };

      fetchPasswords();

      return () => {
        isActive = false;
      };
    }, [])
  );

  const togglePasswordVisibility = (id) => {
    setVisiblePasswords((prevVisiblePasswords) => ({
      ...prevVisiblePasswords,
      [id]: !prevVisiblePasswords[id],
    }));
  };

  const handleLongPress = (passwordId) => {
    Alert.alert(
      "Supprimer le mot de passe",
      "Êtes-vous sûr de vouloir supprimer ce mot de passe ?",
      [
        {
          text: "Non",
          onPress: () => console.log("Suppression annulée"),
          style: "cancel"
        },
        { 
          text: "Oui", onPress: async () => {
            console.log('Suppression validée');
            deletePassword(passwordId);
            setPasswords(await getPasswords());
            ToastAndroid.showWithGravity('Mot de passe supprimé !', ToastAndroid.SHORT, ToastAndroid.TOP)

          } 
        }
      ],
      { cancelable: false }
    );
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mes MDPs</Text>
      <FlatList
        data={passwords}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onLongPress={() => handleLongPress(item.id)}>
          <View style={styles.item}>
            <Text>Service: {item.service}</Text>
            <Text>User: {item.user}</Text>
            <View style={styles.passwordContainer}>
              <TextInput 
                style={styles.input}
                secureTextEntry={!visiblePasswords[item.id]} // Le mot de passe est masqué si visiblePasswords[id] est false ou undefined
                value={item.password} // Affichez la valeur du mot de passe ici
                editable={false} // Optionnel : rendez le TextInput non éditable si vous ne voulez pas que l'utilisateur change le mot de passe ici
              />
              <TouchableOpacity
                style={styles.toggle}
                onPress={() => togglePasswordVisibility(item.id)}
              >
                <AntDesign name={visiblePasswords[item.id] ? 'eye' : 'eyeo'} size={24} />
              </TouchableOpacity>
            </View>
          </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAF0',
  },
  item: {
    marginVertical: 8,
    padding: 16,
    backgroundColor: 'white',
    alignSelf: 'stretch',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    fontWeight: 'bold',
    color: '#000000'
    // Ajoutez ici d'autres styles pour votre TextInput si nécessaire
  },
  toggle: {
    // Styles pour le bouton de l'icône d'œil, ajustez selon vos besoins
    marginLeft: 10,
  },
  title:{
    fontSize: 25,
    textAlign: 'center',
    margin: 10,
    color: '#8A7967',
    fontWeight:'500'
  }
  // ... autres styles
});

export default HomeScreen;
