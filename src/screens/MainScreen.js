import React, { useState, useEffect } from 'react';
import {StyleSheet, View, Text, TouchableOpacity, SafeAreaView, Dimensions, Image, FlatList, Alert} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {removeChallenge} from "../redux/slices/eventsSlice"; // Import useSelector to access Redux state

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

export default function App({navigation}) {
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
    const  dispatch = useDispatch();
    const handleChallengeAction = (item, actionType) => {
        // Dispatch action to remove the challenge from Redux
        dispatch(removeChallenge({ title: item.title, addedDate: item.addedDate }));

        // Show modal/alert
        if (actionType === 'done') {
            Alert.alert(
                'Congratulations!',
                'You did great! Keep up the good work and continue striving for your goals.'
            );
        } else if (actionType === 'failed') {
            Alert.alert(
                'Don\'t Worry!',
                'It\'s okay to stumble sometimes. Keep pushing and you\'ll get there!'
            );
        }
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
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 20,}}>
                    <Image style={styles.logo} source={require('../assets/img/Frame.png')}/>
                    <Text style={styles.todayText}>Today</Text>
                </View>

                <View style={styles.dateSelector}>
                    {dates.map((date, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[
                                styles.dateBubble,
                                selectedDateIndex === index && styles.selectedDateBubble,
                                { backgroundColor: selectedDateIndex === index ? '#FFD700' : '#E02B82' } // Yellow for selected, pink for others
                            ]}
                            onPress={() => setSelectedDateIndex(index)}
                        >
                            <Text style={[
                                styles.dateNumber,
                                { color: selectedDateIndex === index ? '#333' : '#FFF' }
                            ]}>{date.dayNum}</Text>
                            <Text style={[
                                styles.dateDay,
                                { color: selectedDateIndex === index ? '#333' : '#FFF' }
                            ]}>{date.dayText}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            {/* Main Content - Conditional Rendering */}
            <View style={styles.mainContent}>
                {filteredChallenges.length > 0 ? (
                    // Display challenges if available for the selected date
                    <FlatList
                        data={filteredChallenges}
                        renderItem={renderChallengeItem}
                        keyExtractor={(item, index) => item.title + index} // Use a unique key
                        contentContainerStyle={styles.challengesList}
                    />
                ) : (
                    // Display "No challenges" message
                    <>
                        <Image style={{width: 200, height: 200}} source={require('../assets/img/beb4476f2d4cbec48784ca5332c5b636d3f95a39.png')}/>
                        <Text style={styles.challengeText}>
                            You haven't started any challenges yet. Browse the list and choose one that fits <Text style={styles.highlightText}>your goals!</Text>
                        </Text>
                        <TouchableOpacity onPress={() => { navigation.navigate('ChallengeListScreen') }}>
                            <Image source={require('../assets/img/FrameEx.png')}/>
                        </TouchableOpacity>
                    </>
                )}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FF69B4', // Hot Pink background
    },
    challengeActions: {
        flexDirection: 'row',
        marginLeft: 10,
    },
    actionButton: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 8,
    },
    failedButton: {
        backgroundColor: '#FF0000', // Red
    },
    doneButton: {
        backgroundColor: '#00FF00', // Green
    },
    actionButtonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 14,
    },
    header: {
        paddingTop: 20,
        marginBottom: 40,
    },
    logo: {
        width: 30, // Adjust size as needed
        height: 30, // Adjust size as needed
        marginRight: 10,
    },
    todayText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginLeft: 16,
        color: '#FFF',
    },
    dateSelector: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    dateBubble: {
        width: width / 6,
        height: width / 6,
        borderRadius: (width / 6) / 2,
        justifyContent: 'center',
        // backgroundColor: '#FFD700',
        alignItems: 'center',
        marginHorizontal: 5,
    },
    selectedDateBubble: {
        // No specific border, color change handles selection
    },
    dateNumber: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    dateDay: {
        fontSize: 14,
    },
    mainContent: {
        flex: 1,
        backgroundColor: '#FF69B4',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 30,
    },
    challengeText: {
        fontSize: 22,
        color: '#FFF',
        textAlign: 'center',
        marginBottom: 40,
        lineHeight: 30,
    },
    highlightText: {
        fontWeight: 'bold',
        color: '#FFD700', // Yellow for "your goals!"
    },
    challengesList: {
        paddingHorizontal: 10,
        paddingBottom: 20, // Add some padding at the bottom
    },
    challengeItem: {
        flexDirection: 'column',
        backgroundColor: '#E02B82',
        borderRadius: 15,
        padding: 15,
        marginBottom: 15,
        alignItems: 'center',
        width: width * 0.75, // Adjust width to fit screen better
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    challengeImage: {
        width: 60,
        height: 60,
        borderRadius: 10,
        marginRight: 15,
    },
    challengeInfo: {
        flex: 1,
    },
    challengeTitle: {
        fontSize: 18,
        fontFamily: 'Fredoka',
        fontWeight: 'bold',
        color: '#f8a3cc', // Pink title
        marginBottom: 5,
    },
    challengeGoal: {
        fontFamily: 'Fredoka',
        fontSize: 14,
        color: '#fff',
    },
});
