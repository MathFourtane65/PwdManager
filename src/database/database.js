import * as SQLite from 'expo-sqlite';

const database = SQLite.openDatabase('pwdmanager.db');

const initializeDatabase = () => {
    database.transaction(tx => {
        tx.executeSql(
            `CREATE TABLE IF NOT EXISTS passwords (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user TEXT NOT NULL,
                password TEXT NOT NULL,
                service TEXT NOT NULL
              );`,
              [],
              () => console.log('Table created successfully'),
              (_, error) => console.log('Failed to create table', error)
        );
    });
};

export const getDatabaseConnection = () => database;
export const initDb = initializeDatabase;