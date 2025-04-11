import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Colors } from '../constants/Colors';
import { Text } from 'react-native';
import React from 'react';
import HomeOutline from '../assets/icons/HomeOutline';
import HomeSolid from '../assets/icons/HomeSolid';
import FavoriteOutline from '../assets/icons/FavoriteOutline';
import FavoriteSolid from '../assets/icons/Favoritesolid';
import HomeScreen from './(panel)/home';
import FavoriteScreen from './(panel)/favorite';
import ProfileScreen from './(panel)/profile';
import QrCodeScreen from './(panel)/qrcode';
import { Feather, FontAwesome, Ionicons } from '@expo/vector-icons';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const Tab = createBottomTabNavigator();

export default function TabsRoutes() {

    return (
        <SafeAreaProvider style={{ flex: 1 }}>
            <Tab.Navigator
                screenOptions={{
                    headerShown: false,
                    tabBarStyle: {
                        backgroundColor: Colors.colors.background,
                        borderTopWidth: 0.5,
                        paddingTop: 5,
                        borderColor: Colors.colors.textDark,
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: 65,
                    },
                    tabBarLabelStyle: {
                        fontSize: 12,
                        paddingTop: 5,
                        fontWeight: 'bold',
                        color: Colors.colors.black,
                    },
                }}
            >
                <Tab.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{
                        tabBarIcon: ({ focused }) =>
                            focused ? (
                                <HomeSolid color={Colors.colors.black} />
                            ) : (
                                <HomeOutline color={Colors.colors.textDark} />
                            ),
                    }}
                />

                <Tab.Screen
                    name="Favorite"
                    component={FavoriteScreen}
                    options={{
                        tabBarIcon: ({ focused }) =>
                            focused ? (
                                <FavoriteSolid color={Colors.colors.black} />
                            ) : (
                                <FavoriteOutline color={Colors.colors.textDark} />
                            ),
                    }}
                />

                <Tab.Screen
                    name="Qrcode"
                    component={QrCodeScreen}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <Ionicons
                                name={focused ? 'qr-code' : 'qr-code-outline'}
                                size={24}
                                color={
                                    focused
                                        ? Colors.colors.black
                                        : Colors.colors.textDark
                                }
                            />
                        ),
                    }}
                />

                <Tab.Screen
                    name="Profile"
                    component={ProfileScreen}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <FontAwesome
                                name={focused ? 'user' : 'user-o'}
                                size={24}
                                color={
                                    focused
                                        ? Colors.colors.black
                                        : Colors.colors.textDark
                                }
                            />
                        ),
                    }}
                />
            </Tab.Navigator>
        </SafeAreaProvider>
    );
}
