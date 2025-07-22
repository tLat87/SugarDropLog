import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    SafeAreaView,
    Dimensions,
    Image,
    FlatList,
    Alert,
    ScrollView // Added ScrollView for better content handling if the list is short
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { removeChallenge } from "../redux/slices/eventsSlice";

const { width } = Dimensions.get('window');

// Helper function to get day name from date
const getDayName = (date) => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return days[date.getDay()];
};

// Helper function to check if two dates are the same day (ignoring time)
const isSameDay = (date1, date2) => {
    return date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate();
};

export default function App({ navigation }) {
    // Generate dates dynamically
    const generateDates = () => {
        const today = new Date();
        const newDates = [];
        for (let i = 4; i >= 0; i--) { // Loop to get today and 4 past days
            const date = new Date(today);
            date.setDate(today.getDate() - i);
            newDates.push({
                dayNum: date.getDate(),
                dayText: getDayName(date),
                fullDate: date, // Store full date object
            });
        }
        return newDates;
    };

    const [dates, setDates] = useState(generateDates());
    const [selectedDateIndex, setSelectedDateIndex] = useState(4); // 4 for the last day (today)

    // Access challenges from Redux store
    const allChallenges = useSelector(state => state.challenges);
    const dispatch = useDispatch();

    const handleChallengeAction = (item, actionType) => {
        Alert.alert(
            actionType === 'done' ? 'Confirm Completion' : 'Confirm Failure',
            actionType === 'done'
                ? `Are you sure you want to mark "${item.title}" as done?`
                : `Are you sure you want to mark "${item.title}" as failed?`,
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: actionType === 'done' ? 'Done!' : 'Failed',
                    onPress: () => {
                        dispatch(removeChallenge({ title: item.title, addedDate: item.addedDate }));
                        if (actionType === 'done') {
                            Alert.alert(
                                'Awesome!',
                                `"${item.title}" completed! You're making great progress. 🎉`
                            );
                        } else if (actionType === 'failed') {
                            Alert.alert(
                                'Keep Going!',
                                `"${item.title}" marked as failed. Don't worry, every step counts. 💪`
                            );
                        }
                    },
                    style: actionType === 'done' ? 'default' : 'destructive', // Green for done, Red for failed
                },
            ],
            { cancelable: true }
        );
    };

    // State to hold challenges filtered by the selected date
    const [filteredChallenges, setFilteredChallenges] = useState([]);

    // Effect to filter challenges whenever selectedDateIndex or allChallenges changes
    useEffect(() => {
        const selectedDate = dates[selectedDateIndex]?.fullDate;
        if (selectedDate) {
            const challengesForSelectedDate = allChallenges.filter(challenge => {
                // Parse the ISO string addedDate back into a Date object
                const challengeAddedDate = new Date(challenge.addedDate);
                return isSameDay(selectedDate, challengeAddedDate);
            });
            setFilteredChallenges(challengesForSelectedDate);
        } else {
            setFilteredChallenges([]); // No date selected or invalid index
        }
    }, [selectedDateIndex, allChallenges, dates]); // Re-run when these dependencies change

    // Render item for FlatList
    const renderChallengeItem = ({ item }) => (
        <View style={styles.challengeItem}>
            <Image source={item.img} style={styles.challengeImage} />
            <View style={styles.challengeInfo}>
                <Text style={styles.challengeTitle}>{item.title}</Text>
                <Text style={styles.challengeGoal}>{item.goal}</Text>
            </View>
            <View style={styles.challengeActions}>
                <TouchableOpacity
                    style={[styles.actionButton, styles.failedButton]}
                    onPress={() => handleChallengeAction(item, 'failed')}
                >
                    <Text style={styles.actionButtonText}>Failed</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.actionButton, styles.doneButton]}
                    onPress={() => handleChallengeAction(item, 'done')}
                >
                    <Text style={styles.actionButtonText}>Done</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            {/* Header - Today and Date Bubbles */}
            <View style={styles.header}>
                <View style={styles.headerTopRow}>
                    <Image style={styles.logo} source={require('../assets/img/Frame.png')} />
                    <Text style={styles.todayText}>Your Challenges</Text>
                </View>

                <View style={styles.dateSelector}>
                    {dates.map((date, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[
                                styles.dateBubble,
                                selectedDateIndex === index ? styles.selectedDateBubble : styles.unselectedDateBubble // Apply explicit styles
                            ]}
                            onPress={() => setSelectedDateIndex(index)}
                        >
                            <Text style={[
                                styles.dateNumber,
                                selectedDateIndex === index ? styles.selectedDateText : styles.unselectedDateText
                            ]}>{date.dayNum}</Text>
                            <Text style={[
                                styles.dateDay,
                                selectedDateIndex === index ? styles.selectedDateText : styles.unselectedDateText
                            ]}>{date.dayText}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            {/* Main Content - Conditional Rendering */}
            <ScrollView contentContainerStyle={styles.mainContentScroll}>
                {filteredChallenges.length > 0 ? (
                    // Display challenges if available for the selected date
                    <FlatList
                        data={filteredChallenges}
                        renderItem={renderChallengeItem}
                        keyExtractor={(item, index) => item.title + index + item.addedDate} // More robust key
                        contentContainerStyle={styles.challengesList}
                        scrollEnabled={false} // FlatList inside ScrollView, manage scrolling with ScrollView
                    />
                ) : (
                    // Display "No challenges" message
                    <View style={styles.noChallengesContainer}>
                        <Image style={styles.noChallengesImage} source={require('../assets/img/beb4476f2d4cbec48784ca5332c5b636d3f95a39.png')} />
                        <Text style={styles.challengeText}>
                            It looks like you don't have any challenges for {' '}
                            <Text style={styles.highlightText}>
                                {selectedDateIndex === 4 ? 'today' : dates[selectedDateIndex]?.dayText}!
                            </Text>
                        </Text>
                        <Text style={styles.challengeTextSmall}>
                            Ready to set new goals? Browse our list of exciting challenges.
                        </Text>
                        <TouchableOpacity
                            style={styles.browseChallengesButton}
                            onPress={() => { navigation.navigate('ChallengeListScreen') }}
                        >
                            <Text style={styles.browseChallengesButtonText}>Explore Challenges</Text>
                            {/*<Image source={require('../assets/img/FrameEx.png')} style={styles.browseChallengesIcon}/>*/}
                        </TouchableOpacity>
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0E6FA', // Very light lavender/purple background
    },
    header: {
        backgroundColor: '#8A2BE2', // BlueViolet for header
        paddingTop: 30,
        paddingBottom: 20,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 10,
    },
    headerTopRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    logo: {
        width: 35,
        height: 35,
        marginRight: 10,
        tintColor: '#FFF', // Make logo white for contrast
    },
    todayText: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#FFF',
        fontFamily: 'Fredoka',
        textShadowColor: 'rgba(0, 0, 0, 0.2)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
    dateSelector: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    dateBubble: {
        width: width / 7.5, // Slightly smaller bubbles for more compact look
        height: width / 7.5,
        borderRadius: (width / 7.5) / 2,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 3, // Reduced margin
        borderWidth: 2,
        borderColor: 'transparent',
    },
    selectedDateBubble: {
        backgroundColor: '#DDA0DD', // Plum/light purple for selected
        borderColor: '#FFF',
        transform: [{ scale: 1.15 }], // More pronounced scale
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 8,
    },
    unselectedDateBubble: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)', // More transparent white
        borderColor: 'rgba(255, 255, 255, 0.1)', // Subtler border
    },
    dateNumber: {
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: 'Fredoka',
    },
    dateDay: {
        fontSize: 12,
        fontFamily: 'Fredoka',
    },
    selectedDateText: {
        color: '#FFF', // White text for selected bubble
    },
    unselectedDateText: {
        color: '#F0E6FA', // Very light lavender text for unselected bubbles
    },
    mainContentScroll: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 30,
        paddingHorizontal: 20,
        backgroundColor: '#F0E6FA', // Match container background
    },
    noChallengesContainer: {
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#FFFFFF', // White background for the empty state card
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 8,
        marginHorizontal: 20,
    },
    noChallengesImage: {
        width: 220,
        height: 220,
        marginBottom: 20,
        resizeMode: 'contain',
    },
    challengeText: {
        fontSize: 20,
        color: '#6A5ACD', // SlateBlue for main text
        textAlign: 'center',
        marginBottom: 10,
        lineHeight: 28,
        fontFamily: 'Fredoka',
    },
    challengeTextSmall: {
        fontSize: 16,
        color: '#8A2BE2', // BlueViolet for smaller text
        textAlign: 'center',
        marginBottom: 30,
        lineHeight: 24,
        fontFamily: 'Fredoka',
    },
    highlightText: {
        fontWeight: 'bold',
        color: '#9370DB', // MediumPurple for highlights
    },
    browseChallengesButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#9370DB', // MediumPurple for the button
        borderRadius: 30,
        paddingVertical: 15,
        paddingHorizontal: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 7,
    },
    browseChallengesButtonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: 'Fredoka',
        // marginRight: 10, // Removed as there's no icon now
    },
    browseChallengesIcon: {
        width: 24,
        height: 24,
        tintColor: '#FFF',
    },
    challengesList: {
        paddingTop: 10,
        width: width * 0.9,
        alignSelf: 'center',
    },
    challengeItem: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF', // White background for challenge cards
        borderRadius: 20,
        padding: 15,
        marginBottom: 15,
        alignItems: 'center',
        justifyContent: 'space-between',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 8,
        borderWidth: 1,
        borderColor: '#DDA0DD', // Plum/light purple border
    },
    challengeImage: {
        width: 70,
        height: 70,
        borderRadius: 15,
        marginRight: 15,
        borderWidth: 2,
        borderColor: '#C5A0D6', // Lighter violet border around image
    },
    challengeInfo: {
        flex: 1,
        marginRight: 10,
    },
    challengeTitle: {
        fontSize: 19,
        fontFamily: 'Fredoka',
        fontWeight: 'bold',
        color: '#8A2BE2', // BlueViolet for title
        marginBottom: 5,
    },
    challengeGoal: {
        fontFamily: 'Fredoka',
        fontSize: 15,
        color: '#555',
    },
    challengeActions: {
        flexDirection: 'column',
        alignItems: 'flex-end',
    },
    actionButton: {
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 5,
        minWidth: 70,
    },
    failedButton: {
        backgroundColor: '#DDA0DD', // Plum/light purple for 'Failed'
    },
    doneButton: {
        backgroundColor: '#9370DB', // MediumPurple for 'Done'
    },
    actionButtonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 13,
        fontFamily: 'Fredoka',
    },
});
