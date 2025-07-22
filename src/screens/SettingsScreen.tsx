import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Switch,
    Alert,
    Linking,
    Image,
    ImageBackground, ScrollView,
} from 'react-native';
import {removeAllChallenge} from "../redux/slices/eventsSlice";
import {useDispatch} from "react-redux";
import Share from 'react-native-share';


const SettingsScreen = () => {
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);
    const dispatch = useDispatch();

    const toggleNotifications = () => {
        setNotificationsEnabled((previousState) => !previousState);
        // In a real app, you would save this setting (e.g., AsyncStorage, backend)
    };

    const handleShareApp = async () => {
        const shareOptions = {
            message: 'Check out this awesome app! It helps you track your challenges and goals.',
            url: 'https://your-app-store-link.com', // Replace with your actual app store link
            title: 'Share My Awesome Challenge App',
        };
        try {
            await Share.open(shareOptions);
        } catch (error) {
            console.error('Error sharing:', error.message);
            Alert.alert('Share Error', 'There was an issue trying to share the app.');
        }
    };

    const handleResetData = () => {
        Alert.alert(
            'Reset Data',
            'Are you sure you want to reset all data? This action cannot be undone.',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Reset',
                    onPress: () => {
                        dispatch(removeAllChallenge());
                        Alert.alert('Data Reset', 'All data has been reset successfully!');
                    },
                    style: 'destructive',
                },
            ],
            { cancelable: true }
        );
    };

    const handleOpenLink = (url) => {
        Linking.openURL(url).catch((err) =>
            Alert.alert('Error', `Could not open URL: ${err.message}`)
        );
    };

    return (
        <ImageBackground source={require('../assets/img/g7.png')} style={styles.background}>
            <ScrollView style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Settings</Text>
                </View>

                {/* The notifications switch is commented out in your original code, but I've kept the styling ready */}
                {/* <View style={styles.settingItem}>
                    <Text style={styles.settingText}>Notifications</Text>
                    <Switch
                        trackColor={{ false: '#A0A0A0', true: '#FF6EB4' }} // Slightly darker pink for track
                        thumbColor={notificationsEnabled ? '#FFFFFF' : '#F4F4F4'} // White thumb
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleNotifications}
                        value={notificationsEnabled}
                    />
                </View> */}

                <TouchableOpacity style={styles.settingItem} onPress={handleShareApp}>
                    <Text style={styles.settingText}>Share the app</Text>
                    <Text style={styles.arrowIcon}>↗️</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.settingItem} onPress={handleResetData}>
                    <Text style={styles.settingText}>Reset all data</Text>
                    <Text style={styles.arrowIcon}>🔄</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.settingItem}
                    onPress={() => handleOpenLink('https://www.termsfeed.com/live/79312a96-3b50-4827-8378-cadc3303dc53')}
                >
                    <Text style={styles.settingText}>Terms of Use / Privacy Policy</Text>
                    <Text style={styles.arrowIcon}>📄</Text>
                </TouchableOpacity>

                {/* New "For Developers" Block */}
                <View style={styles.developerSection}>
                    <Text style={styles.developerSectionTitle}>For Developers 🧑‍💻</Text>
                    <Text style={styles.developerSectionText}>
                        Interested in building awesome apps with React Native? Here's a quick roadmap:
                    </Text>
                    <Text style={styles.developerRoadmapItem}>1. **Learn JavaScript/ES6+**: Foundation for React Native.</Text>
                    <Text style={styles.developerRoadmapItem}>2. **Understand React Basics**: Components, State, Props, Hooks.</Text>
                    <Text style={styles.developerRoadmapItem}>3. **Explore React Native Core Components**: `View`, `Text`, `Image`, `ScrollView`, `FlatList`, `TouchableOpacity`.</Text>
                    <Text style={styles.developerRoadmapItem}>4. **Styling in React Native**: `StyleSheet.create`, Flexbox.</Text>
                    <Text style={styles.developerRoadmapItem}>5. **Navigation**: React Navigation library (Stacks, Tabs, Drawers).</Text>
                    <Text style={styles.developerRoadmapItem}>6. **State Management**: Redux Toolkit, Context API, Zustand, or Jotai.</Text>
                    <Text style={styles.developerRoadmapItem}>7. **API Integration**: `fetch` API, Axios for backend communication.</Text>
                    <Text style={styles.developerRoadmapItem}>8. **Platform Specific Code**: `Platform` module, native modules.</Text>
                    <Text style={styles.developerRoadmapItem}>9. **Debugging & Testing**: Reactotron, Jest, React Native Testing Library.</Text>
                    <Text style={styles.developerRoadmapItem}>10. **Deployment**: App Store Connect (iOS), Google Play Console (Android).</Text>

                </View>
                <View style={{marginBottom: 100}}/>
            </ScrollView>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        // Changed from pink to a semi-transparent violet/purple
        backgroundColor: 'rgba(138, 43, 226, 0.8)', // BlueViolet with 80% opacity
        padding: 20,
    },
    header: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 30,
        marginBottom: 20,
    },
    headerText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 28,
        fontFamily: 'Fredoka',
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
    settingItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#FFFFFF', // Keep white for general settings items
        borderRadius: 15,
        paddingVertical: 18,
        paddingHorizontal: 20,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 6,
        borderWidth: 1,
        // Light lavender/purple border
        borderColor: '#DDA0DD', // Plum/light purple
    },
    settingText: {
        fontSize: 20,
        // Changed to a deep violet
        color: '#8A2BE2', // BlueViolet
        fontWeight: 'bold',
        fontFamily: 'Fredoka',
        flex: 1,
        marginRight: 10,
    },
    arrowIcon: {
        fontSize: 24,
        // Changed to a medium purple
        color: '#9370DB', // MediumPurple
    },
    // Styles for the Developer Section
    developerSection: {
        // Lightest lavender/purple background for distinction
        backgroundColor: '#F8F0FF', // Very light pale purple
        borderRadius: 15,
        padding: 20,
        marginTop: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 5,
        elevation: 5,
        borderWidth: 1,
        // Slightly darker purple border
        borderColor: '#C5A0D6', // Lighter violet
    },
    developerSectionTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        // Darker purple for the title
        color: '#6A5ACD', // SlateBlue
        marginBottom: 10,
        fontFamily: 'Fredoka',
        textAlign: 'center',
    },
    developerSectionText: {
        fontSize: 16,
        color: '#555',
        fontFamily: 'Fredoka',
        marginBottom: 10,
        lineHeight: 22,
    },
    developerRoadmapItem: {
        fontSize: 15,
        fontFamily: 'Fredoka',
        color: '#333',
        marginBottom: 5,
        marginLeft: 5,
        lineHeight: 20,
    },
    learnMoreButton: {
        // Medium purple button
        backgroundColor: '#9370DB', // MediumPurple
        borderRadius: 10,
        paddingVertical: 12,
        paddingHorizontal: 15,
        marginTop: 15,
        alignItems: 'center',
    },
    learnMoreButtonText: {
        color: 'white',
        fontSize: 17,
        fontWeight: 'bold',
        fontFamily: 'Fredoka',
    },
});
export default SettingsScreen;
