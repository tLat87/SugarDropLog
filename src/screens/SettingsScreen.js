import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Switch,
    Alert, // For demonstration, consider a custom modal in a real app
    Linking, Image, ImageBackground, // To open external links
} from 'react-native';
import {removeAllChallenge, removeChallenge} from "../redux/slices/eventsSlice";
import {useDispatch} from "react-redux";
import Share from 'react-native-share'; // Import the Share module


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
        const ShareResponse = await Share.open(shareOptions);

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
                        Alert.alert('Data Reset', 'All data has been reset.');
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
        <View style={styles.container}>
            <View style={{alignItems: 'center', justifyContent: 'center', paddingVertical: 50}}>
                <Image source={require('../assets/img/g7.png')}/>
                <Text style={{color:'white', fontWeight: 'bold',position: 'absolute', fontSize: 16, fontFamily: 'Fredoka'}}>
                    Settings
                </Text>
            </View>


            {/*<View style={styles.settingItem}>*/}
            {/*    <Text style={styles.settingText}>Notifications</Text>*/}
            {/*    <Switch*/}
            {/*        trackColor={{ false: '#767577', true: '#FF69B4' }} // Pink when active*/}
            {/*        thumbColor={notificationsEnabled ? '#f4f3f4' : '#f4f3f4'}*/}
            {/*        ios_backgroundColor="#3e3e3e"*/}
            {/*        onValueChange={toggleNotifications}*/}
            {/*        value={notificationsEnabled}*/}
            {/*    />*/}
            {/*</View>*/}

            <TouchableOpacity style={styles.settingItem} onPress={handleShareApp}>
                <Text style={styles.settingText}>Share the app</Text>
                <Text style={styles.arrowIcon}>➡️</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.settingItem} onPress={handleResetData}>
                <Text style={styles.settingText}>Reset all data</Text>
                <Text style={styles.arrowIcon}>🔄</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.settingItem}
                onPress={() => handleOpenLink('https://www.termsfeed.com/live/79312a96-3b50-4827-8378-cadc3303dc53')} // Replace with actual URL
            >
                <Text style={styles.settingText}>Terms of Use / Privacy Policy</Text>
                <Text style={styles.arrowIcon}>📄</Text>
            </TouchableOpacity>
        </View>
    );
};

const settingsStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FF2B8D', // Light grey background
        padding: 20,
    },
    settingItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

        borderRadius: 15,
        paddingVertical: 15,
        paddingHorizontal: 20,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        borderWidth: 1,
        borderColor: '#FFC0CB', // Light pink border
    },
    settingText: {
        fontSize: 26,
        color: '#fff',
        fontWeight: 'bold',fontFamily: 'Fredoka',
        flex: 1, // Allow text to take available space
    },
    arrowIcon: {
        fontSize: 20,
        color: '#FF69B4', // Pink color for icons
    },
});

const stylesMain = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F8F8', // Light grey background
        padding: 20,
    },
    header: {
        alignItems: 'center',
        marginBottom: 30,
        backgroundColor: '#FFC0CB', // Light pink background for header
        paddingVertical: 20,
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    icon: {
        fontSize: 60,
        marginBottom: 10,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
    },
    section: {
        backgroundColor: '#FFF',
        borderRadius: 15,
        padding: 20,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        borderWidth: 1,
        borderColor: '#FF69B4', // Pink border
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FF69B4', // Pink title
        marginBottom: 10,
    },
    sectionContent: {
        fontSize: 16,
        color: '#555',
        lineHeight: 24,
    },
    ruleItem: {
        fontSize: 16,
        color: '#555',
        lineHeight: 24,
        marginLeft: 10,
        marginBottom: 5,
    },
});


const styles = { ...stylesMain, ...settingsStyles }; // This line is just for demonstration if you want to merge

export default SettingsScreen;
