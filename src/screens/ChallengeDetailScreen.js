import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import {addChallenge} from "../redux/slices/eventsSlice"; // Import useDispatch

const ChallengeDetailScreen = ({ route, navigation }) => {
    const { challenge } = route.params;
    const dispatch = useDispatch(); // Initialize dispatch

    const handleAddChallenge = () => {
        const currentDate = new Date().toISOString(); // Get current date in ISO format
        // You can format this date string as you prefer, e.g., toLocaleDateString()

        // Dispatch the action with the challenge and the current date
        dispatch(addChallenge({ ...challenge, addedDate: currentDate }));

        // Optionally, navigate back or show a confirmation message
        navigation.goBack();
        // Or show a toast/alert: Alert.alert('Success', 'Challenge added to your list!');
    };

    return (
        <ScrollView style={styles.container}>
            <TouchableOpacity onPress={() => {navigation.goBack()}} style={{position: 'absolute', left: 0, top: 40, width: '100%'}}>
                <Image source={require('../assets/img/g69.png')}/>
            </TouchableOpacity>
            <View style={{alignItems: 'center', justifyContent: 'center', paddingVertical: 20}}>
                <Image source={require('../assets/img/g7.png')}/>
                <Text style={{color:'white', fontWeight: 'bold',position: 'absolute', fontSize: 16, fontFamily: 'Fredoka'}}>
                    Details
                </Text>
            </View>
            <View style={styles.header}>
                <Image source={challenge.img} style={{width:100, height: 100}}/>
                <Text style={styles.title}>{challenge.title}</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Goal:</Text>
                <Text style={styles.sectionContent}>{challenge.goal}</Text>
            </View>

            {challenge.rules && challenge.rules.length > 0 && (
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Rules:</Text>
                    {challenge.rules.map((rule, index) => (
                        <Text key={index} style={styles.ruleItem}>
                            • {rule}
                        </Text>
                    ))}
                </View>
            )}

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Duration:</Text>
                <Text style={styles.sectionContent}>{challenge.duration}</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Category:</Text>
                <Text style={styles.sectionContent}>{challenge.category}</Text>
            </View>

            {/* The button to add the challenge */}
            <TouchableOpacity onPress={handleAddChallenge} style={{marginBottom: 100, alignItems: 'center'}}>
                <Image source={require('../assets/img/Framef2.png')}/>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FF2B8D', // Light grey background
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
        fontSize: 38,
        fontFamily: 'Fredoka',
        fontWeight: 'bold',
        color: '#fff',
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
        fontSize: 28,
        fontFamily: 'Fredoka',
        fontWeight: 'bold',
        color: '#FF69B4', // Pink title
        marginBottom: 10,
    },
    sectionContent: {
        fontSize: 22,
        fontFamily: 'Fredoka',
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

export default ChallengeDetailScreen;
