// import React from 'react';
// import {
//     View,
//     Text,
//     StyleSheet,
//     ScrollView,
//     Image,
//     TouchableOpacity,
//     SafeAreaView, // Added SafeAreaView for better layout
//     Alert, // Added Alert for confirmation dialog
// } from 'react-native';
// import { useDispatch } from 'react-redux';
// import {addChallenge} from "../redux/slices/eventsSlice";
//
// const ChallengeDetailScreen = ({ route, navigation }) => {
//     const { challenge } = route.params;
//     const dispatch = useDispatch();
//
//     const handleAddChallenge = () => {
//         Alert.alert(
//             'Start This Challenge?',
//             `Are you sure you want to add "${challenge.title}" to your active challenges?`,
//             [
//                 {
//                     text: 'Cancel',
//                     style: 'cancel',
//                 },
//                 {
//                     text: 'Yes, Start It!',
//                     onPress: () => {
//                         const currentDate = new Date().toISOString();
//                         dispatch(addChallenge({ ...challenge, addedDate: currentDate }));
//                         Alert.alert('Success!', `"${challenge.title}" has been added to your challenges. Good luck! 🎉`);
//                         navigation.goBack(); // Navigate back after adding
//                     },
//                     style: 'default', // Default style for confirmation
//                 },
//             ],
//             { cancelable: true }
//         );
//     };
//
//     return (
//         <SafeAreaView style={styles.safeArea}>
//             <View style={styles.headerBar}>
//                 <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
//                     <Image source={require('../assets/img/g69.png')} style={styles.backIcon}/>
//                 </TouchableOpacity>
//                 <Text style={styles.headerTitle}>Challenge Details</Text>
//             </View>
//
//             <ScrollView contentContainerStyle={styles.scrollViewContent}>
//                 <View style={styles.heroSection}>
//                     <Image source={challenge.img} style={styles.challengeImage} />
//                     <Text style={styles.challengeTitle}>{challenge.title}</Text>
//                     <Text style={styles.challengeIcon}>{challenge.icon}</Text>
//                 </View>
//
//                 <View style={styles.section}>
//                     <Text style={styles.sectionTitle}>Goal</Text>
//                     <Text style={styles.sectionContent}>{challenge.goal}</Text>
//                 </View>
//
//                 {challenge.rules && challenge.rules.length > 0 && (
//                     <View style={styles.section}>
//                         <Text style={styles.sectionTitle}>Rules</Text>
//                         {challenge.rules.map((rule, index) => (
//                             <Text key={index} style={styles.ruleItem}>
//                                 • {rule}
//                             </Text>
//                         ))}
//                     </View>
//                 )}
//
//                 <View style={styles.section}>
//                     <Text style={styles.sectionTitle}>Duration</Text>
//                     <Text style={styles.sectionContent}>{challenge.duration}</Text>
//                 </View>
//
//                 <View style={styles.section}>
//                     <Text style={styles.sectionTitle}>Category</Text>
//                     <Text style={styles.sectionContent}>{challenge.category}</Text>
//                 </View>
//
//                 {/* The button to add the challenge */}
//                 <TouchableOpacity onPress={handleAddChallenge} style={styles.addButton}>
//                     <Text style={styles.addButtonText}>Start This Challenge!</Text>
//                 </TouchableOpacity>
//
//                 <View style={{marginBottom: 40}}/> {/* Spacer for bottom */}
//             </ScrollView>
//         </SafeAreaView>
//     );
// };
//
// const styles = StyleSheet.create({
//     safeArea: {
//         flex: 1,
//         backgroundColor: '#FCE4EC', // Very light pink/blush background for overall app
//     },
//     headerBar: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'center',
//         backgroundColor: '#FF69B4', // Hot Pink for header background
//         paddingTop: 20,
//         paddingBottom: 20,
//         borderBottomLeftRadius: 30,
//         borderBottomRightRadius: 30,
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 5 },
//         shadowOpacity: 0.2,
//         shadowRadius: 8,
//         elevation: 10,
//         marginBottom: 20, // Space below header
//     },
//     backButton: {
//         position: 'absolute',
//         left: 20,
//         padding: 10, // Increased touch target
//     },
//     backIcon: {
//         width: 24, // Adjusted size
//         height: 24,
//         tintColor: '#FFF', // White icon for contrast
//     },
//     headerTitle: {
//         color: 'white',
//         fontWeight: 'bold',
//         fontSize: 28, // Larger title
//         fontFamily: 'Fredoka',
//         textShadowColor: 'rgba(0, 0, 0, 0.3)',
//         textShadowOffset: { width: 1, height: 1 },
//         textShadowRadius: 2,
//     },
//     scrollViewContent: {
//         paddingHorizontal: 20,
//         paddingBottom: 20, // Padding at the bottom of scroll view
//     },
//     heroSection: {
//         alignItems: 'center',
//         marginBottom: 30,
//         backgroundColor: '#FFC0CB', // Light pink background for hero
//         paddingVertical: 30, // More padding
//         borderRadius: 25, // More rounded
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 5 },
//         shadowOpacity: 0.15,
//         shadowRadius: 8,
//         elevation: 8,
//         position: 'relative', // For icon positioning
//         borderWidth: 1,
//         borderColor: '#FFB6C1',
//     },
//     challengeImage: {
//         width: 120, // Larger image
//         height: 120,
//         borderRadius: 20, // Rounded image
//         marginBottom: 15,
//         borderWidth: 3, // Thicker border
//         borderColor: '#FF69B4', // Pink border around image
//         resizeMode: 'contain',
//     },
//     challengeTitle: {
//         fontSize: 32, // Larger title for prominence
//         fontFamily: 'Fredoka',
//         fontWeight: 'bold',
//         color: '#FF2B8D', // Deep pink
//         textAlign: 'center',
//         marginBottom: 10,
//         paddingHorizontal: 10,
//     },
//     challengeIcon: {
//         fontSize: 40, // Larger icon
//         position: 'absolute', // Positioned absolutely for unique placement
//         top: 20,
//         right: 20,
//         // You might consider adding a background or shadow to the icon if it blends too much
//         // backgroundColor: 'rgba(255,255,255,0.7)',
//         // borderRadius: 10,
//         // padding: 5,
//     },
//     section: {
//         backgroundColor: '#FFF', // White background for sections
//         borderRadius: 20, // More rounded corners
//         padding: 20,
//         marginBottom: 20,
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 4 },
//         shadowOpacity: 0.1,
//         shadowRadius: 8,
//         elevation: 8,
//         borderWidth: 1,
//         borderColor: '#FFC0CB', // Light pink border
//     },
//     sectionTitle: {
//         fontSize: 24, // Consistent title size
//         fontFamily: 'Fredoka',
//         fontWeight: 'bold',
//         color: '#FF69B4', // Vibrant pink title
//         marginBottom: 10,
//         borderBottomWidth: 1, // Subtle separator line
//         borderBottomColor: '#FCE4EC', // Very light pink for separator
//         paddingBottom: 5,
//     },
//     sectionContent: {
//         fontSize: 18, // Adjusted content font size
//         fontFamily: 'Fredoka',
//         color: '#555', // Darker gray for readability
//         lineHeight: 26, // Improved line height
//     },
//     ruleItem: {
//         fontSize: 16,
//         color: '#666', // Slightly darker rule text
//         lineHeight: 24,
//         marginLeft: 15, // Indent for list items
//         marginBottom: 8, // More space between rules
//         fontFamily: 'Fredoka',
//     },
//     addButton: {
//         backgroundColor: '#28A745', // Vibrant green for "Add Challenge"
//         borderRadius: 30, // Pill-shaped button
//         paddingVertical: 18,
//         alignItems: 'center',
//         justifyContent: 'center',
//         marginTop: 20,
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 5 },
//         shadowOpacity: 0.25,
//         shadowRadius: 10,
//         elevation: 10,
//         // Optional: gradient could be added here for extra flair
//     },
//     addButtonText: {
//         color: '#FFF',
//         fontSize: 22,
//         fontWeight: 'bold',
//         fontFamily: 'Fredoka',
//         textTransform: 'uppercase', // Make text uppercase
//     },
// });
//
// export default ChallengeDetailScreen;

import React, { useState, useEffect, useCallback } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    TouchableOpacity,
    SafeAreaView,
    Alert,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { addChallenge } from "../redux/slices/eventsSlice";
import { StackScreenProps } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage'; // For progress persistence
import { useFocusEffect } from '@react-navigation/native'; // To refresh progress when coming back

// Define the type for a Challenge object
interface Challenge {
    id: string; // Unique ID for the challenge
    title: string;
    goal: string;
    rules?: string[];
    duration: string; // e.g., "7 Days", "30 Days"
    category: string;
    img: any; // Use 'any' or specific ImageSourcePropType if known
    icon: string; // Emoji or text icon
    // Added for progress tracking:
    totalDays: number; // e.g., 7, 30
}

// Define the types for your navigation stack parameters
type RootStackParamList = {
    ChallengeDetailScreen: { challenge: Challenge };
    // Add other screens if necessary
};

type ChallengeDetailScreenProps = StackScreenProps<RootStackParamList, 'ChallengeDetailScreen'>;

// Helper to get today's date in YYYY-MM-DD format
const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
};

function ChallengeDetailScreen({ route, navigation }: ChallengeDetailScreenProps) {
    const { challenge } = route.params;
    const dispatch = useDispatch();

    const [currentProgress, setCurrentProgress] = useState<number>(0);
    const [lastLogDate, setLastLogDate] = useState<string | null>(null); // YYYY-MM-DD of last log

    // Load progress and last log date from AsyncStorage
    const loadProgress = useCallback(async () => {
        try {
            const storedProgress = await AsyncStorage.getItem(`challenge_progress_${challenge.id}`);
            if (storedProgress) {
                const { progress, lastLog } = JSON.parse(storedProgress);
                setCurrentProgress(progress);
                setLastLogDate(lastLog);
            } else {
                // If no progress found, reset
                setCurrentProgress(0);
                setLastLogDate(null);
            }
        } catch (error) {
            console.error('Failed to load challenge progress:', error);
        }
    }, [challenge.id]);

    // Save progress and last log date to AsyncStorage
    const saveProgress = async (progress: number, logDate: string | null) => {
        try {
            await AsyncStorage.setItem(`challenge_progress_${challenge.id}`, JSON.stringify({ progress, lastLog: logDate }));
        } catch (error) {
            console.error('Failed to save challenge progress:', error);
        }
    };

    // Load progress on initial mount and when screen is focused
    useEffect(() => {
        loadProgress();
    }, [loadProgress]);

    useFocusEffect(
        useCallback(() => {
            loadProgress(); // Reload progress when navigating back to this screen
        }, [loadProgress])
    );

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
                    onPress: async () => {
                        const currentDate = new Date().toISOString();
                        dispatch(addChallenge({ ...challenge, addedDate: currentDate }));
                        // Reset/initialize progress when challenge is added
                        setCurrentProgress(0);
                        setLastLogDate(null);
                        await saveProgress(0, null); // Save initial state to storage

                        Alert.alert('Success!', `"${challenge.title}" has been added to your challenges. Good luck! 🎉`);
                        navigation.goBack();
                    },
                    style: 'default',
                },
            ],
            { cancelable: true }
        );
    };

    const handleLogProgress = async () => {
        const today = getTodayDate();

        if (lastLogDate === today) {
            Alert.alert('Already Logged Today!', 'You\'ve already logged progress for this challenge today. Come back tomorrow! 😉', [{ text: 'OK' }]);
            return;
        }

        if (currentProgress >= challenge.totalDays) {
            Alert.alert('Challenge Completed!', 'You\'ve already completed this challenge! 🎉', [{ text: 'OK' }]);
            return;
        }

        const newProgress = currentProgress + 1;
        setCurrentProgress(newProgress);
        setLastLogDate(today);
        await saveProgress(newProgress, today);

        if (newProgress >= challenge.totalDays) {
            Alert.alert('Challenge Completed! 🎉', `Congratulations! You've successfully completed the "${challenge.title}" challenge!`, [{ text: 'Awesome!' }]);
        } else {
            Alert.alert('Progress Logged! ✨', `Day ${newProgress} of ${challenge.totalDays} completed!`, [{ text: 'OK' }]);
        }
    };

    // Calculate progress percentage for the bar
    const progressPercentage = challenge.totalDays > 0 ? (currentProgress / challenge.totalDays) * 100 : 0;
    const isChallengeCompleted = currentProgress >= challenge.totalDays;

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.headerBar}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Image source={require('../assets/img/g69.png')} style={styles.backIcon} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Challenge Details</Text>
            </View>

            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.heroSection}>
                    <Image source={challenge.img} style={styles.challengeImage} />
                    <Text style={styles.challengeTitle}>{challenge.title}</Text>
                    <Text style={styles.challengeIcon}>{challenge.icon}</Text>
                </View>

                {/* Progress Section - Visible only if the challenge is already added/started */}
                {/* For simplicity, we'll make it visible always on this detail screen for now
                    You might want to check if the challenge is "active" in Redux before showing this
                    but this allows users to see/log progress even if they navigated directly. */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Progress</Text>
                    <View style={styles.progressBarBackground}>
                        <View style={[styles.progressBarFill, { width: `${progressPercentage}%` }]} />
                    </View>
                    <Text style={styles.progressText}>
                        {isChallengeCompleted ? 'Completed!' : `Day ${currentProgress} of ${challenge.totalDays}`}
                    </Text>
                    <TouchableOpacity
                        style={[
                            styles.logProgressButton,
                            (lastLogDate === getTodayDate() || isChallengeCompleted) && styles.logProgressButtonDisabled
                        ]}
                        onPress={handleLogProgress}
                        disabled={lastLogDate === getTodayDate() || isChallengeCompleted}
                    >
                        <Text style={styles.logProgressButtonText}>
                            {isChallengeCompleted ? 'Challenge Completed!' : (lastLogDate === getTodayDate() ? 'Logged Today 👍' : 'Log Progress for Today')}
                        </Text>
                    </TouchableOpacity>
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

                {/* The button to add the challenge - only show if not already added/active, or if it's meant to be re-addable */}
                {/* For demonstration, we'll keep it always visible, but in a real app, you'd hide it if the user has already started this challenge */}
                <TouchableOpacity onPress={handleAddChallenge} style={styles.addButton}>
                    <Text style={styles.addButtonText}>Start This Challenge!</Text>
                </TouchableOpacity>

                <View style={{ marginBottom: 40 }} />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#F0E6FA', // Very light lavender/purple background
    },
    headerBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#8A2BE2', // BlueViolet for header
        paddingTop: 20,
        paddingBottom: 20,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 10,
        marginBottom: 20,
    },
    backButton: {
        position: 'absolute',
        left: 20,
        padding: 10,
    },
    backIcon: {
        width: 24,
        height: 24,
        tintColor: '#FFF',
    },
    headerTitle: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 28,
        fontFamily: 'Fredoka',
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
    scrollViewContent: {
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    heroSection: {
        alignItems: 'center',
        marginBottom: 30,
        backgroundColor: '#DDA0DD', // Plum/light purple background for hero
        paddingVertical: 30,
        borderRadius: 25,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 8,
        position: 'relative',
        borderWidth: 1,
        borderColor: '#C5A0D6', // Lighter violet border
    },
    challengeImage: {
        width: 120,
        height: 120,
        borderRadius: 20,
        marginBottom: 15,
        borderWidth: 3,
        borderColor: '#8A2BE2', // BlueViolet border around image
        resizeMode: 'contain',
    },
    challengeTitle: {
        fontSize: 32,
        fontFamily: 'Fredoka',
        fontWeight: 'bold',
        color: '#6A5ACD', // SlateBlue (deep purple)
        textAlign: 'center',
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    challengeIcon: {
        fontSize: 40,
        position: 'absolute',
        top: 20,
        right: 20,
        color: '#6A5ACD', // SlateBlue for icon
    },
    section: {
        backgroundColor: '#FFFFFF', // White background for sections
        borderRadius: 20,
        padding: 20,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 8,
        borderWidth: 1,
        borderColor: '#DDA0DD', // Plum/light purple border
    },
    sectionTitle: {
        fontSize: 24,
        fontFamily: 'Fredoka',
        fontWeight: 'bold',
        color: '#9370DB', // MediumPurple title
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#F0E6FA', // Very light lavender for separator
        paddingBottom: 5,
    },
    sectionContent: {
        fontSize: 18,
        fontFamily: 'Fredoka',
        color: '#555',
        lineHeight: 26,
    },
    ruleItem: {
        fontSize: 16,
        color: '#666',
        lineHeight: 24,
        marginLeft: 15,
        marginBottom: 8,
        fontFamily: 'Fredoka',
    },
    // --- Progress Bar Styles ---
    progressBarBackground: {
        height: 15,
        backgroundColor: '#E6E6FA', // Light lavender
        borderRadius: 10,
        overflow: 'hidden',
        marginBottom: 10,
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: '#9370DB', // MediumPurple for progress fill
        borderRadius: 10,
    },
    progressText: {
        fontSize: 16,
        fontFamily: 'Fredoka',
        color: '#6A5ACD', // SlateBlue
        textAlign: 'center',
        marginBottom: 15,
        fontWeight: 'bold',
    },
    logProgressButton: {
        backgroundColor: '#6A5ACD', // SlateBlue for log button
        borderRadius: 25,
        paddingVertical: 12,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 6,
    },
    logProgressButtonDisabled: {
        backgroundColor: '#C5A0D6', // Lighter violet when disabled
    },
    logProgressButtonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: 'Fredoka',
    },
    // --- End Progress Bar Styles ---
    addButton: {
        backgroundColor: '#28A745', // Vibrant green for "Add Challenge" (kept green for strong action)
        borderRadius: 30,
        paddingVertical: 18,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.25,
        shadowRadius: 10,
        elevation: 10,
    },
    addButtonText: {
        color: '#FFF',
        fontSize: 22,
        fontWeight: 'bold',
        fontFamily: 'Fredoka',
        textTransform: 'uppercase',
    },
});

export default ChallengeDetailScreen;
