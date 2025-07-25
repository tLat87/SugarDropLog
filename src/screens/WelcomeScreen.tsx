import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const WelcomeScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            {/* Background Decorative Images - positioned more strategically */}
            <Image
                source={require('../assets/img/b6322ca91c13b01961aafe6e76a3ae50399bf1fe.png')} // Top left fruit/berry
                style={styles.topLeftDeco}
                resizeMode="contain"
            />
            <Image
                source={require('../assets/img/4f1d17d3e62ccbb8d6718b2035ea576f3eccd0a6.png')} // Middle right fruit
                style={styles.middleRightDeco}
                resizeMode="contain"
            />
            <Image
                source={require('../assets/img/839889cdc10107a48a359959afdf5d730c7fd2ae.png')} // Bottom left fruit
                style={styles.bottomLeftDeco}
                resizeMode="contain"
            />

            <View style={styles.content}>
                {/* App Logo/Branding */}
                <View style={styles.logoContainer}>
                    {/*<Image*/}
                    {/*    source={require('../assets/img/061e0b519eb28e5afc84c278c14d3c2dd5698e59.png')} // Your app's main logo*/}
                    {/*    style={styles.logo}*/}
                    {/*    resizeMode="contain"*/}
                    {/*/>*/}
                    <Text style={styles.appNameText}>Smart Habits</Text> {/* Added app name */}
                </View>


                {/* Welcome Message */}
                <Text style={styles.welcomeText}>Welcome!</Text>

                {/* Description */}
                <Text style={styles.description}>
                    Take control of your sweet habits.{"\n"}
                    Track your sugar intake, join daily{"\n"}
                    challenges, and build healthier{"\n"}
                    routines — one day at a time.
                </Text>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('MainTab')}
                >
                    <Text style={styles.buttonText}>Get Started!</Text>
                    {/*<Image source={require('../assets/img/Frame2ygvuhio.png')} style={styles.buttonIcon}/> /!* Arrow icon *!/*/}
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // Consistent very light lavender/purple background
        backgroundColor: '#F0E6FA',
        justifyContent: 'center',
        alignItems: 'center',
    },
    // Decorative Images
    topLeftDeco: {
        width: 150,
        height: 150,
        position: 'absolute',
        top: 50,
        left: -50,
        opacity: 0.6,
        tintColor: '#DDA0DD', // Tint to a light purple for consistency
    },
    middleRightDeco: {
        width: 180,
        height: 180,
        position: 'absolute',
        top: 150,
        right: -70,
        opacity: 0.6,
        tintColor: '#C5A0D6', // Tint to a lighter violet
    },
    bottomLeftDeco: {
        width: 170,
        height: 170,
        position: 'absolute',
        bottom: 50,
        left: -60,
        opacity: 0.6,
        tintColor: '#A0B0D0', // Tint to a slightly bluish-purple
    },
    content: {
        alignItems: 'center',
        paddingHorizontal: 30,
        // Semi-transparent white card for main content
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: 25,
        paddingVertical: 40,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.2,
        shadowRadius: 15,
        elevation: 15,
        width: '90%',
        maxWidth: 400,
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    logo: {
        width: 180,
        height: 90,
        marginBottom: 5,
        tintColor: '#8A2BE2', // Tint logo to BlueViolet if it's a monochrome image
    },
    appNameText: {
        fontSize: 28,
        fontWeight: 'bold',
        fontFamily: 'Fredoka',
        // BlueViolet for app name
        color: '#8A2BE2',
        textShadowColor: 'rgba(0, 0, 0, 0.1)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
    welcomeText: {
        fontSize: 34,
        fontWeight: 'bold',
        fontFamily: 'Fredoka',
        // SlateBlue for welcome text
        color: '#6A5ACD',
        marginBottom: 15,
        marginTop: 10,
    },
    description: {
        fontSize: 18,
        textAlign: 'center',
        color: '#555', // Keep dark gray for readability
        marginBottom: 30,
        fontFamily: 'Fredoka',
        lineHeight: 26,
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        // MediumPurple button
        backgroundColor: '#9370DB',
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.25,
        shadowRadius: 10,
        elevation: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
        fontFamily: 'Fredoka',
        fontWeight: 'bold',
        marginRight: 10,
    },
    buttonIcon: {
        width: 24,
        height: 24,
        resizeMode: 'contain',
        tintColor: '#FFF', // Ensure icon is white
    }
});

export default WelcomeScreen;
