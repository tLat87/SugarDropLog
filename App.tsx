import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack'; // Import CardStyleInterpolators
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./src/redux/store";
import MainTabNavigator from "./src/navigation/MainTabNavigator";
import WelcomeScreen from "./src/screens/WelcomeScreen";
import ChallengeDetailScreen from "./src/screens/ChallengeDetailScreen";
import ArticleDetailScreen from "./src/screens/ArticleDetailScreen";
import AddNoteScreen from "./src/screens/AddNoteScreen"; // Assuming you've added this screen

const Stack = createStackNavigator();

export default function App() {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <NavigationContainer>
                    <Stack.Navigator
                        screenOptions={{
                            headerShown: false, // Keep headers hidden as per your current setup
                            // Apply default transition for all screens
                            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, // Smooth horizontal slide
                        }}
                    >
                        {/* Define your screens */}
                        <Stack.Screen name="Welcome" component={WelcomeScreen} />
                        <Stack.Screen name="MainTab" component={MainTabNavigator} />
                        <Stack.Screen name="ChallengeDetailScreen" component={ChallengeDetailScreen} />
                        <Stack.Screen name="ArticleDetailScreen" component={ArticleDetailScreen} />
                        <Stack.Screen name="AddNoteScreen" component={AddNoteScreen} />
                        {/* Add other screens as needed */}
                    </Stack.Navigator>
                </NavigationContainer>
            </PersistGate>
        </Provider>
    );
}
