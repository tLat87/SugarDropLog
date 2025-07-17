import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    TouchableOpacity,
    SafeAreaView, // Added SafeAreaView for better layout
    Alert, // Added Alert for confirmation dialog
} from 'react-native';
import { useDispatch } from 'react-redux';
import {addChallenge} from "../redux/slices/eventsSlice";

const ChallengeDetailScreen = ({ route, navigation }) => {
    const { challenge } = route.params;
    const dispatch = useDispatch();

    const handleAddChallenge = () => {
        Alert.alert(
            'Start This Challenge?',
            `Are you sure you want to add "${challenge.title}" to your active challenges?`,
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Yes, Start It!',
                    onPress: () => {
                        const currentDate = new Date().toISOString();
                        dispatch(addChallenge({ ...challenge, addedDate: currentDate }));
                        Alert.alert('Success!', `"${challenge.title}" has been added to your challenges. Good luck! 🎉`);
                        navigation.goBack(); // Navigate back after adding
                    },
                    style: 'default', // Default style for confirmation
                },
            ],
            { cancelable: true }
        );
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.headerBar}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Image source={require('../assets/img/g69.png')} style={styles.backIcon}/>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Challenge Details</Text>
            </View>

            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.heroSection}>
                    <Image source={challenge.img} style={styles.challengeImage} />
                    <Text style={styles.challengeTitle}>{challenge.title}</Text>
                    <Text style={styles.challengeIcon}>{challenge.icon}</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Goal</Text>
                    <Text style={styles.sectionContent}>{challenge.goal}</Text>
                </View>

                {challenge.rules && challenge.rules.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Rules</Text>
                        {challenge.rules.map((rule, index) => (
                            <Text key={index} style={styles.ruleItem}>
                                • {rule}
                            </Text>
                        ))}
                    </View>
                )}

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Duration</Text>
                    <Text style={styles.sectionContent}>{challenge.duration}</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Category</Text>
                    <Text style={styles.sectionContent}>{challenge.category}</Text>
                </View>

                {/* The button to add the challenge */}
                <TouchableOpacity onPress={handleAddChallenge} style={styles.addButton}>
                    <Text style={styles.addButtonText}>Start This Challenge!</Text>
                </TouchableOpacity>

                <View style={{marginBottom: 40}}/> {/* Spacer for bottom */}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#FCE4EC', // Very light pink/blush background for overall app
    },
    headerBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FF69B4', // Hot Pink for header background
        paddingTop: 20,
        paddingBottom: 20,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 10,
        marginBottom: 20, // Space below header
    },
    backButton: {
        position: 'absolute',
        left: 20,
        padding: 10, // Increased touch target
    },
    backIcon: {
        width: 24, // Adjusted size
        height: 24,
        tintColor: '#FFF', // White icon for contrast
    },
    headerTitle: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 28, // Larger title
        fontFamily: 'Fredoka',
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
    scrollViewContent: {
        paddingHorizontal: 20,
        paddingBottom: 20, // Padding at the bottom of scroll view
    },
    heroSection: {
        alignItems: 'center',
        marginBottom: 30,
        backgroundColor: '#FFC0CB', // Light pink background for hero
        paddingVertical: 30, // More padding
        borderRadius: 25, // More rounded
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 8,
        position: 'relative', // For icon positioning
        borderWidth: 1,
        borderColor: '#FFB6C1',
    },
    challengeImage: {
        width: 120, // Larger image
        height: 120,
        borderRadius: 20, // Rounded image
        marginBottom: 15,
        borderWidth: 3, // Thicker border
        borderColor: '#FF69B4', // Pink border around image
        resizeMode: 'contain',
    },
    challengeTitle: {
        fontSize: 32, // Larger title for prominence
        fontFamily: 'Fredoka',
        fontWeight: 'bold',
        color: '#FF2B8D', // Deep pink
        textAlign: 'center',
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    challengeIcon: {
        fontSize: 40, // Larger icon
        position: 'absolute', // Positioned absolutely for unique placement
        top: 20,
        right: 20,
        // You might consider adding a background or shadow to the icon if it blends too much
        // backgroundColor: 'rgba(255,255,255,0.7)',
        // borderRadius: 10,
        // padding: 5,
    },
    section: {
        backgroundColor: '#FFF', // White background for sections
        borderRadius: 20, // More rounded corners
        padding: 20,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 8,
        borderWidth: 1,
        borderColor: '#FFC0CB', // Light pink border
    },
    sectionTitle: {
        fontSize: 24, // Consistent title size
        fontFamily: 'Fredoka',
        fontWeight: 'bold',
        color: '#FF69B4', // Vibrant pink title
        marginBottom: 10,
        borderBottomWidth: 1, // Subtle separator line
        borderBottomColor: '#FCE4EC', // Very light pink for separator
        paddingBottom: 5,
    },
    sectionContent: {
        fontSize: 18, // Adjusted content font size
        fontFamily: 'Fredoka',
        color: '#555', // Darker gray for readability
        lineHeight: 26, // Improved line height
    },
    ruleItem: {
        fontSize: 16,
        color: '#666', // Slightly darker rule text
        lineHeight: 24,
        marginLeft: 15, // Indent for list items
        marginBottom: 8, // More space between rules
        fontFamily: 'Fredoka',
    },
    addButton: {
        backgroundColor: '#28A745', // Vibrant green for "Add Challenge"
        borderRadius: 30, // Pill-shaped button
        paddingVertical: 18,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.25,
        shadowRadius: 10,
        elevation: 10,
        // Optional: gradient could be added here for extra flair
    },
    addButtonText: {
        color: '#FFF',
        fontSize: 22,
        fontWeight: 'bold',
        fontFamily: 'Fredoka',
        textTransform: 'uppercase', // Make text uppercase
    },
});

export default ChallengeDetailScreen;
