import React from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    ScrollView, Image,
} from 'react-native';

// Sample data for challenges
const challenges = [
    {
        id: '1',
        category: '🍭 SUGAR REDUCTION CHALLENGES',
        title: '21 Days Without Sugar',
        goal: 'Avoid all added sugars for 21 days.',
        rules: [
            'No desserts, soda, candy, sweet pastries.',
            'Natural sugars in fruit are allowed.',
        ],
        icon: '🍭',
        duration: '21 Days',
        img: require('../assets/img/1d0ec491be1b1946c7a00245851a8249c69fe443.png'),
    },
    {
        id: '2',
        category: '🍭 SUGAR REDUCTION CHALLENGES',
        title: 'Sugar-Free Week',
        goal: 'Complete 7 consecutive days without added sugar.',
        rules: [
            'No desserts, soda, candy, sweet pastries.',
            'Natural sugars in fruit are allowed.',
        ],
        icon: '🗓️',
        duration: '7 Days',
        img: require('../assets/img/17bc7d75beae9013568e95137814c078226151e1.png'),
    },
    {
        id: '3',
        category: '🍭 SUGAR REDUCTION CHALLENGES',
        title: 'Only One Sweet Per Day',
        goal: 'Limit sweet treats to one portion daily.',
        rules: [
            'Allowed: 1 dessert, snack bar, or sweet drink per day.',
            'No additional sugar beyond that.',
        ],
        icon: '🍬',
        duration: '14 Days',
        img: require('../assets/img/1d0ec491be1b1946c7a00245851a8249c69fe443.png'),
    },
    {
        id: '4',
        category: '🍭 SUGAR REDUCTION CHALLENGES',
        title: 'No Sugar After 6 PM',
        goal: 'Build mindful eating habits in the evening.',
        rules: ['No sweet food or drinks after 6 PM.'],
        icon: '⏰',
        duration: '10 Days',
        img: require('../assets/img/17bc7d75beae9013568e95137814c078226151e1.png'),
    },
    {
        id: '5',
        category: '🍎 FRUIT-FOCUSED CHALLENGES',
        title: 'Fruit Over Sweets',
        goal: 'Replace cravings with fruit.',
        rules: ['Any time you crave sugar, choose fruit.', 'No added sugar snacks.'],
        icon: '🍎',
        duration: '10 Days',
        img: require('../assets/img/17bc7d75beae9013568e95137814c078226151e1.png'),
    },
    {
        id: '6',
        category: '🍎 FRUIT-FOCUSED CHALLENGES',
        title: '3 Fruits a Day',
        goal: 'Add natural, sweet nutrition to daily diet.',
        rules: ['Eat at least 3 different fruits daily.'],
        icon: '🍏',
        duration: '7 Days',
        img: require('../assets/img/9447cdbc3902fcc08f8756d6ecc02169f5cfa49b.png'),
    },
    {
        id: '7',
        category: '🧠 MINDFULNESS & FLEXIBLE CHALLENGES',
        title: 'Mindful Sweetness',
        goal: 'Become aware of sugar consumption.',
        rules: [
            'Log every time you eat or drink something sweet.',
            'Reflect on why you ate it (habit, emotion, etc.).',
        ],
        icon: '🧠',
        duration: '14 Days',
        img: require('../assets/img/9447cdbc3902fcc08f8756d6ecc02169f5cfa49b.png'),
    },
    {
        id: '8',
        category: '🧠 MINDFULNESS & FLEXIBLE CHALLENGES',
        title: 'Weekend Warrior',
        goal: 'Stay sugar-aware on weekends, when cravings spike.',
        rules: ['Avoid all sugary snacks on Saturday and Sunday.'],
        icon: '💪',
        duration: '4 Weekends',
        img: require('../assets/img/9447cdbc3902fcc08f8756d6ecc02169f5cfa49b.png'),
    },
    {
        id: '9',
        category: 'MINDFULNESS & FLEXIBLE CHALLENGES',
        title: 'Sugar Swap',
        goal: 'Each day, replace one sugary item with something healthier.',
        rules: [], // No specific rules listed in the prompt for this one
        icon: '🔄',
        duration: '7 Days',
        img: require('../assets/img/17bc7d75beae9013568e95137814c078226151e1.png'),
    },
];

const ChallengeListScreen = ({ navigation }) => {
    // Group challenges by category
    const groupedChallenges = challenges.reduce((acc, challenge) => {
        (acc[challenge.category] = acc[challenge.category] || []).push(challenge);
        return acc;
    }, {});

    const renderChallengeCard = ({ item }) => (
        <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('ChallengeDetailScreen', { challenge: item })}
        >

            <View style={styles.cardHeader}>
                <Text style={styles.cardIcon}>{item.icon}</Text>
                <View style={styles.cardTitleContainer}>
                    <Text style={styles.cardTitle}>{item.title}</Text>
                    <Text style={styles.cardDuration}>{item.duration}</Text>
                </View>
            </View>
            <View style={styles.cardHeader}>
                <Image style={{width: 70, height: 70}} source={item.img}/>
                <Text style={styles.cardGoal}>{item.goal}</Text>
            </View>

            <TouchableOpacity
                style={styles.detailsButton}
                onPress={() => navigation.navigate('ChallengeDetailScreen', { challenge: item })}
            >
                <Text style={styles.detailsButtonText}>Details</Text>
            </TouchableOpacity>
        </TouchableOpacity>
    );

    return (
        <ScrollView style={styles.container}>
            <View style={{alignItems: 'center', justifyContent: 'center', paddingVertical: 20}}>
                <Image source={require('../assets/img/g7.png')}/>
                <Text style={{color:'white', fontWeight: 'bold',position: 'absolute', fontSize: 16, fontFamily: 'Fredoka'}}>
                    Challenges
                </Text>
            </View>
            {Object.keys(groupedChallenges).map((category) => (
                <View key={category} style={styles.categorySection}>
                    <Text style={styles.categoryTitle}>{category}</Text>
                    <FlatList
                        data={groupedChallenges[category]}
                        renderItem={renderChallengeCard}
                        keyExtractor={(item) => item.id}
                        scrollEnabled={false} // Disable inner scroll for FlatList
                        contentContainerStyle={styles.listContent}
                    />
                </View>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FF2B8D', // Light grey background
        paddingVertical: 20,
    },
    categorySection: {
        marginBottom: 20,
        paddingHorizontal: 15,
    },
    categoryTitle: {
        fontFamily: 'Fredoka',
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 10,
        textTransform: 'uppercase',
    },
    listContent: {
        paddingBottom: 10,
    },
    card: {
        backgroundColor: '#E02B82',
        borderRadius: 15,
        padding: 20,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        borderWidth: 1,
        borderColor: '#FFC0CB', // Light pink border
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    cardIcon: {
        fontSize: 30,
        marginRight: 15,
    },
    cardTitleContainer: {
        flex: 1,
    },
    cardTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 5,
        fontFamily: 'Fredoka',
    },
    cardDuration: {
        fontSize: 14,
        color: '#fff',
        fontFamily: 'Fredoka',
    },
    cardGoal: {
        fontSize: 20,
        color: '#fff',
        marginBottom: 15,
        fontFamily: 'Fredoka',
        width: '80%',
    },
    detailsButton: {
        backgroundColor: '#FF69B4', // Pink button
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 10,
        alignSelf: 'flex-start', // Align button to the left
    },
    detailsButtonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 14,
        fontFamily: 'Fredoka',
    },
});

export default ChallengeListScreen;
