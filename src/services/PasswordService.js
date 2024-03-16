import { getDatabaseConnection } from '../database/database';
import * as Crypto from 'expo-crypto';
import * as SecureStore from 'expo-secure-store';
import base64 from 'react-native-base64';

async function generateEncryptionKey(){
    const key = 'cle-secrete';
    await SecureStore.setItemAsync('encryptionKey', key);
}

async function getEncryptionKey(){
    return await SecureStore.getItemAsync('encryptionKey');
}

function simpleEncrypt(plainText, key){
    return base64.encode(plainText)
}

function simpleDecrypt(encryptedText, key){
    return base64.decode(encryptedText)
}

export const createPassword = async (user, plainPassword, service) => {
    const key = await getEncryptionKey();
  const encryptedPassword = simpleEncrypt(plainPassword, key);
    try {

        // Obtenir la connexion à la base de données
        const db = getDatabaseConnection();

        // Insertion du mot de passe haché dans la base de données en utilisant une requête paramétrée
        db.transaction(tx => {
            tx.executeSql(
                `INSERT INTO passwords (user, password, service) VALUES (?, ?, ?);`,
                [user, encryptedPassword, service],
                () => console.log('Password added successfully'),
                (_, error) => console.log('Failed to add password', error)
            );
        });
    } catch (error) {
        console.error("Error adding password", error);
    }
}

export const getPasswords = async () => {
    const passwords = await new Promise((resolve, reject) => {
        const db = getDatabaseConnection();

        db.transaction(tx => {
            tx.executeSql(
                'SELECT * FROM passwords;',
                [],
                (_, { rows }) => {
                    resolve(rows._array)
                },
                (_, error) => {
                    console.log('Failed to retrieve passwords', error);
                    reject(error);
                }
            );
        });
    })
    const key = await getEncryptionKey();
    return passwords.map(p => ({
        ...p,
        password: simpleDecrypt(p.password, key)  
    }));
};

export const deletePassword = async (id) => {
    try {
        const db = getDatabaseConnection();
        db.transaction(tx => {
            tx.executeSql(
                `DELETE FROM passwords WHERE id = ?;`,
                [id],
                () => {
                    console.log('Password deleted successfully')
                    //getPasswords().catch(console.error); // Assurez-vous que cette logique est gérable dans le contexte de votre application
                },
                (_, error) => console.log('Failed to delete password', error)
            );
        });
    } catch (error) {
        
    }
}