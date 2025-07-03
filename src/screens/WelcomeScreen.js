import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, ImageBackground, TouchableOpacity, Image } from 'react-native';

const WelcomeScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <Image
                source={require('../assets/img/4f1d17d3e62ccbb8d6718b2035ea576f3eccd0a6.png')}
                style={{borderRadius: 30, width: 200, height: 300,top: 100, position: 'absolute', alignSelf: 'center'}}
                resizeMode="contain"
            />
            <Image
                source={require('../assets/img/b6322ca91c13b01961aafe6e76a3ae50399bf1fe.png')}
                style={{width: 200, height: 300,top: -100,left: -30, position: 'absolute', alignSelf: 'center'}}
                resizeMode="contain"
            />
            <Image
                source={require('../assets/img/839889cdc10107a48a359959afdf5d730c7fd2ae.png')}
                style={{width: 200, height: 300,bottom: 0,right: -30, position: 'absolute', alignSelf: 'center'}}
                resizeMode="contain"
            />
                <View style={styles.content}>
                    <Image
                        source={require('../assets/img/061e0b519eb28e5afc84c278c14d3c2dd5698e59.png')}
                        style={styles.logo}
                        resizeMode="contain"
                    />
                    <Text style={styles.welcomeText}>Welcome!</Text>
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
                       <Image source={require('../assets/img/Frame2ygvuhio.png')}/>
                    </TouchableOpacity>
                </View>
            {/*</ImageBackground>*/}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FF2B8D',
    },
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        alignItems: 'center',
        paddingHorizontal: 30,
        paddingTop: 50,
    },
    logo: {
        width: 300,
        height: 150,
        marginBottom: 20,
        marginTop: 50,
    },
    welcomeText: {
        fontSize: 38,
        fontWeight: 'bold',
        marginTop: 100,
        fontFamily: 'Fredoka',
        color: 'white',
        marginBottom: 10,
    },
    description: {
        fontSize: 22,
        textAlign: 'center',
        color: 'white',
        marginBottom: 30,
        fontFamily: 'Fredoka',
        lineHeight: 22,
    },
    button: {

    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontFamily: 'Fredoka',
        fontWeight: 'bold',
    },
});

export default WelcomeScreen;
