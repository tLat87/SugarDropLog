import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack'; // Import CardStyleInterpolators
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./src/redux/store";
import MainTabNavigator from "./src/navigation/MainTabNavigator";
import WelcomeScreen from "./src/screens/WelcomeScreen.tsx";
import ChallengeDetailScreen from "./src/screens/ChallengeDetailScreen.tsx";
import ArticleDetailScreen from "./src/screens/ArticleDetailScreen.tsx";
import AddNoteScreen from "./src/screens/AddNoteScreen.tsx";
import ChallengeListScreen from "./src/screens/ChallengeListScreen.tsx";

const Stack = createStackNavigator();

export default function App() {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <NavigationContainer>
                    <Stack.Navigator
                        screenOptions={{
                            headerShown: false,
                            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                        }}
                    >
                        <Stack.Screen name="Welcome" component={WelcomeScreen} />
                        <Stack.Screen name="MainTab" component={MainTabNavigator} />
                        <Stack.Screen name="ChallengeDetailScreen" component={ChallengeDetailScreen} />
                        <Stack.Screen name="ArticleDetailScreen" component={ArticleDetailScreen} />
                        <Stack.Screen name="AddNoteScreen" component={AddNoteScreen} />
                        <Stack.Screen name="ChallengeListScreen" component={ChallengeListScreen} />
                    </Stack.Navigator>
                </NavigationContainer>
            </PersistGate>
        </Provider>
    );
}
