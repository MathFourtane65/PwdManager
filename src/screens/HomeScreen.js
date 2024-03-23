import React, { useState } from 'react';
import { StyleSheet, View, FlatList, Text, TextInput, TouchableOpacity, Alert, ToastAndroid } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; // Assurez-vous d'avoir installé @expo/vector-icons
import { useFocusEffect } from '@react-navigation/native';
import { getPasswords, deletePassword } from '../services/PasswordService';
import { useTranslation } from 'react-i18next';

const HomeScreen = () => {
  const { t, i18n } = useTranslation();
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
      <Text style={styles.title}>{t('homeScreenTitle')}</Text>
      <FlatList
        data={passwords}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onLongPress={() => handleLongPress(item.id)}>
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>{item.service}</Text>
            </View>
            <Text><Text style={styles.label}>{t('usernameLabelHomeScreen')} :</Text> {item.user}</Text>
            <View style={styles.cardBody}>
              <Text>{t('passwordLabelHomeScreen')} : </Text>
              <TextInput 
                style={styles.input}
                secureTextEntry={!visiblePasswords[item.id]} 
                value={item.password} 
                editable={false}
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
    // <View style={styles.container}>
    //   <Text style={styles.title}>{t('homeScreenTitle')}</Text>
    //   <FlatList
    //     data={passwords}
    //     keyExtractor={(item) => item.id.toString()}
    //     renderItem={({ item }) => (
    //       <TouchableOpacity onLongPress={() => handleLongPress(item.id)}>
    //       <View style={styles.item}>
    //         <Text>Service: {item.service}</Text>
    //         <Text>User: {item.user}</Text>
    //         <View style={styles.passwordContainer}>
    //           <TextInput 
    //             style={styles.input}
    //             secureTextEntry={!visiblePasswords[item.id]} // Le mot de passe est masqué si visiblePasswords[id] est false ou undefined
    //             value={item.password} // Affichez la valeur du mot de passe ici
    //             editable={false} // Optionnel : rendez le TextInput non éditable si vous ne voulez pas que l'utilisateur change le mot de passe ici
    //           />
    //           <TouchableOpacity
    //             style={styles.toggle}
    //             onPress={() => togglePasswordVisibility(item.id)}
    //           >
    //             <AntDesign name={visiblePasswords[item.id] ? 'eye' : 'eyeo'} size={24} />
    //           </TouchableOpacity>
    //         </View>
    //       </View>
    //       </TouchableOpacity>
    //     )}
    //   />
    // </View>
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
  // input: {
  //   flex: 1,
  //   fontWeight: 'bold',
  //   color: '#000000'
  //   // Ajoutez ici d'autres styles pour votre TextInput si nécessaire
  // },
  toggle: {
    marginLeft: 10,
  },
  title:{
    fontSize: 25,
    textAlign: 'center',
    margin: 10,
    color: '#8A7967',
    fontWeight:'500'
  },
  card: {
    backgroundColor: 'white',
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    padding: 16,
  },
  cardHeader: {
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight:'500',
    fontStyle: 'italic'
  },
  cardBody: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    fontWeight: 'bold',
    color: '#000000',
  },
  label: {
  textDecorationLine: 'underline'
  }
  // ... autres styles
});

export default HomeScreen;
