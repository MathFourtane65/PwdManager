import React, { useState } from 'react';
import { StyleSheet, View, FlatList, Text, TextInput, TouchableOpacity, Alert, ToastAndroid, Modal, Platform } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { getPasswords, deletePassword } from '../services/PasswordService';
import { useTranslation } from 'react-i18next';
import * as Clipboard from 'expo-clipboard';

const HomeScreen = () => {
  const { t, i18n } = useTranslation();
  const [passwords, setPasswords] = useState([]);
  const [visiblePasswords, setVisiblePasswords] = useState({});

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPassword, setSelectedPassword] = useState(null);

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

  const handlePress = (item) => {
    setSelectedPassword(item);
    setModalVisible(true);
  };

  const copyToClipboard = (text) => {
    Clipboard.setStringAsync(text);
    if (Platform.OS === 'android') {
      ToastAndroid.show("Copied to clipboard!", ToastAndroid.SHORT);
    } else {
      Alert.alert('Copied', 'Copied to clipboard!');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('homeScreenTitle')}</Text>
      <FlatList
        data={passwords}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handlePress(item)} onLongPress={() => handleLongPress(item.id)}>
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>{item.service}</Text>
              </View>
              <Text>{item.user}</Text>
              <View style={styles.cardBody}>
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

<Modal
  animationType="fade"
  transparent={true}
  visible={modalVisible}
  onRequestClose={() => setModalVisible(!modalVisible)}
>
  <View style={styles.centeredModalView}>
    <View style={styles.modalContent}>
      <TouchableOpacity
        style={styles.closeButton}
        onPress={() => setModalVisible(!modalVisible)}
      >
        <AntDesign name="close" size={24} color="black" />
      </TouchableOpacity>

      <Text style={styles.modalText}>{selectedPassword?.user}</Text>
      {/* <TouchableOpacity onPress={() => copyToClipboard(selectedPassword?.user)}>
        <AntDesign name="copy1" size={24} color="black" />
      </TouchableOpacity> */}

      <Text style={styles.modalText}>{selectedPassword?.password}</Text>
      {/* <TouchableOpacity onPress={() => copyToClipboard(selectedPassword?.password)}>
        <AntDesign name="copy1" size={24} color="black" />
      </TouchableOpacity> */}

      {/* <TouchableOpacity onPress={() => copyToClipboard(selectedPassword?.user)}>
        <Text>Copier Username<AntDesign name="copy1" size={24} color="black" /></Text>
      </TouchableOpacity> */}

    </View>
  </View>
</Modal>

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
  title: {
    fontSize: 25,
    textAlign: 'center',
    margin: 10,
    color: '#8A7967',
    fontWeight: '500'
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
    fontWeight: '500',
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
  },
  centeredModalView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fond semi-transparent
  },
  modalContent: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  closeButton: {
    position: "absolute",
    right: 10,
    top: 10,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
  // ... autres styles
});

export default HomeScreen;
