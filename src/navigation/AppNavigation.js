import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import AddPasswordScreen from '../screens/AddPasswordScreen';
import SettingScreen from '../screens/SettingScreen';

import { AntDesign } from '@expo/vector-icons';


import { useTranslation } from 'react-i18next';


const Tab = createBottomTabNavigator();

const AppNavigation = () => {
    const { t, i18n } = useTranslation();

    return (
        <>
                <NavigationContainer>
                    <Tab.Navigator
                        screenOptions={({ route }) => ({
                            tabBarActiveTintColor: '#8A7967', //brun focné
                            tabBarInactiveTintColor: '#3E3E3E', //gris
                            tabBarStyle: {
                                backgroundColor: '#FAFAF0', //beige clair
                                borderTopColor: '#8A7967', // brun foncé
                                borderTopWidth: 5,
                            },
                            headerShown: false, //hide the status bar with screen name (at the top of the screen)
                            tabBarIcon: ({ color, size, focused }) => {
                                let iconName;
                                if (route.name === 'Home') {
                                    iconName = 'home';
                                } else if (route.name === 'Add Password') {
                                    iconName = 'plus';
                                } else if (route.name === 'Settings') {
                                    iconName = 'setting';
                                }
                                return <AntDesign name={iconName} size={size} color={color} />;
                            },
                            tabBarLabel: ({ focused, color }) => {
                                let label;
                                if (route.name === 'Home') {
                                    label = t('tabBarhome');
                                } else if (route.name === 'Add Password') {
                                    label = t('addPassword');
                                } else if (route.name === 'Settings') {
                                    label = t('settings');
                                }
                                return <Text style={{ color, fontSize: 12, fontWeight: focused ? 'bold' : 'normal' }}>{label}</Text>;
                            },
                        })}
                    >
                        <Tab.Screen name='Home' component={HomeScreen} />
                        <Tab.Screen name='Add Password' component={AddPasswordScreen} />
                        <Tab.Screen name='Settings' component={SettingScreen} />
                    </Tab.Navigator>
                </NavigationContainer>
        </>
    )
}


export default AppNavigation
