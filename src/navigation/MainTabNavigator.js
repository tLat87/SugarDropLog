import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {Image, Platform, Text, TouchableOpacity, View} from 'react-native';
import MainScreen from '../screens/MainScreen';
import {useNavigation} from '@react-navigation/native';
import ChallengeListScreen from "../screens/ChallengeListScreen";
import SettingsScreen from "../screens/SettingsScreen";
import ArticleListScreen from "../screens/ArticleListScreen";

const Tab = createBottomTabNavigator();

const getTabIcon = (routeName) => {
    switch (routeName) {
        case 'MainScreen':
            return require('../assets/img/Frame2.png');
        case 'ChallengeListScreen':
            return require('../assets/img/Frame3.png');
        case 'SettingsScreen':
            return require('../assets/img/Frame4.png');
        case 'ArticleListScreen':
            return require('../assets/img/Frame5.png');
    }
};

const MainTabNavigator = () => {
    const navigation = useNavigation();
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerStyle: { backgroundColor: '#1F2021', shadowColor: '#1F2021', height: 150 },
                headerShown: false,
                tabBarStyle: {
                    position: 'absolute',
                    // bottom: 1,
                    backgroundColor: 'transparent',
                },
                tabBarIcon: () => (
                    <Image
                        source={getTabIcon(route.name)}
                        style={{ }}
                    />
                ),
            })}
        >
            {/*<Stack.Screen name="ChallengeListScreen" component={ChallengeListScreen} options={{ headerShown: false }} />*/}


            <Tab.Screen
                name="MainScreen"
                component={MainScreen}
                options={{
                    tabBarLabel: '',
                    headerTitle: 'Home',
                }}
            />


            <Tab.Screen
                name="ChallengeListScreen"
                component={ChallengeListScreen}
                options={{
                    tabBarLabel: '',
                    headerTitle: 'Home',
                }}
            />



            <Tab.Screen
                name="ArticleListScreen"
                component={ArticleListScreen}
                options={{
                    tabBarLabel: '',
                    headerTitle: 'Home',
                }}
            />
            <Tab.Screen
                name="SettingsScreen"
                component={SettingsScreen}
                options={{
                    tabBarLabel: '',
                    headerTitle: 'Home',
                }}
            />

        </Tab.Navigator>
    );
};

export default MainTabNavigator;
