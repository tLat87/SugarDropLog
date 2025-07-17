import React from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Image,
    SafeAreaView, // Added SafeAreaView for better layout on notched devices
} from 'react-native';

// Sample data for challenges
const challenges = [
    {
        id: '1',
        category: '🍭 SUGAR REDUCTION CHALLENGES',
        title: '21 Days Without Sugar',
        goal: 'Avoid all added sugars for 21 days. Focus on natural sweetness.',
        rules: [
            'No desserts, soda, candy, sweet pastries.',
            'Natural sugars in fruit are allowed.',
            'Read labels carefully for hidden sugars.',
            'Stay hydrated with water and unsweetened drinks.',
        ],
        icon: '🍭',
        duration: '21 Days',
        img: require('../assets/img/1d0ec491be1b1946c7a00245851a8249c69fe443.png'),
    },
    {
        id: '2',
        category: '🍭 SUGAR REDUCTION CHALLENGES',
        title: 'Sugar-Free Week',
        goal: 'Complete 7 consecutive days without added sugar for a quick detox.',
        rules: [
            'No desserts, soda, candy, sweet pastries.',
            'Natural sugars in fruit are allowed.',
            'Be mindful of condiments and sauces.',
        ],
        icon: '🗓️',
        duration: '7 Days',
        img: require('../assets/img/17bc7d75beae9013568e95137814c078226151e1.png'),
    },
    {
        id: '3',
        category: '🍭 SUGAR REDUCTION CHALLENGES',
        title: 'Only One Sweet Per Day',
        goal: 'Limit sweet treats to one portion daily to build control.',
        rules: [
            'Allowed: 1 dessert, snack bar, or sweet drink per day.',
            'No additional sugar beyond that single portion.',
            'Choose your sweet mindfully.',
        ],
        icon: '🍬',
        duration: '14 Days',
        img: require('../assets/img/1d0ec491be1b1946c7a00245851a8249c69fe443.png'),
    },
    {
        id: '4',
        category: '🍭 SUGAR REDUCTION CHALLENGES',
        title: 'No Sugar After 6 PM',
        goal: 'Build mindful eating habits in the evening to improve sleep and digestion.',
        rules: [
            'No sweet food or drinks after 6 PM.',
            'Includes fruit and natural sweeteners too.',
        ],
        icon: '⏰',
        duration: '10 Days',
        img: require('../assets/img/17bc7d75beae9013568e95137814c078226151e1.png'),
    },
    {
        id: '5',
        category: '🍎 FRUIT-FOCUSED CHALLENGES',
        title: 'Fruit Over Sweets',
        goal: 'Replace cravings with fruit, nourishing your body naturally.',
        rules: [
            'Any time you crave sugar, choose fruit.',
            'No added sugar snacks or artificial sweeteners.',
        ],
        icon: '🍎',
        duration: '10 Days',
        img: require('../assets/img/17bc7d75beae9013568e95137814c078226151e1.png'),
    },
    {
        id: '6',
        category: '🍎 FRUIT-FOCUSED CHALLENGES',
        title: '3 Fruits a Day',
        goal: 'Add natural, sweet nutrition to your daily diet for vitality.',
        rules: [
            'Eat at least 3 different fruits daily.',
            'Vary your fruit choices for diverse nutrients.',
        ],
        icon: '🍏',
        duration: '7 Days',
        img: require('../assets/img/9447cdbc3902fcc08f8756d6ecc02169f5cfa49b.png'),
    },
    {
        id: '7',
        category: '🧠 MINDFULNESS & FLEXIBLE CHALLENGES',
        title: 'Mindful Sweetness',
        goal: 'Become aware of sugar consumption habits and emotional triggers.',
        rules: [
            'Log every time you eat or drink something sweet.',
            'Reflect on why you ate it (habit, emotion, boredom, etc.).',
            'No judgment, just observation.',
        ],
        icon: '🧠',
        duration: '14 Days',
        img: require('../assets/img/9447cdbc3902fcc08f8756d6ecc02169f5cfa49b.png'),
    },
    {
        id: '8',
        category: '🧠 MINDFULNESS & FLEXIBLE CHALLENGES',
        title: 'Weekend Warrior',
        goal: 'Stay sugar-aware on weekends, when cravings often spike.',
        rules: [
            'Avoid all sugary snacks and drinks on Saturday and Sunday.',
            'Plan healthy alternatives for weekend treats.',
        ],
        icon: '💪',
        duration: '4 Weekends',
        img: require('../assets/img/9447cdbc3902fcc08f8756d6ecc02169f5cfa49b.png'),
    },
    {
        id: '9',
        category: '🧠 MINDFULNESS & FLEXIBLE CHALLENGES',
        title: 'Sugar Swap',
        goal: 'Each day, replace one sugary item with something healthier and more nourishing.',
        rules: [
            'Identify one common sugary item you consume daily.',
            'Find a healthier, non-sugary alternative (e.g., soda to sparkling water, candy to nuts).',
            'Make the swap consciously for 7 days.'
        ],
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
            <View style={styles.cardContent}>
                <Image source={item.img} style={styles.cardImage} />
                <View style={styles.cardTextContainer}>
                    <Text style={styles.cardTitle}>{item.title}</Text>
                    <Text style={styles.cardGoal}>{item.goal}</Text>
                    <View style={styles.cardMeta}>
                        <Text style={styles.cardIcon}>{item.icon}</Text>
                        <Text style={styles.cardDuration}>{item.duration}</Text>
                    </View>
                </View>
            </View>
            <TouchableOpacity
                style={styles.detailsButton}
                onPress={() => navigation.navigate('ChallengeDetailScreen', { challenge: item })}
            >
                <Text style={styles.detailsButtonText}>View Details</Text>
            </TouchableOpacity>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <Image source={require('../assets/img/g7.png')} style={styles.headerImage}/>
                <Text style={styles.headerText}>Challenges</Text>
            </View>

            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                {Object.keys(groupedChallenges).map((category) => (
                    <View key={category} style={styles.categorySection}>
                        <Text style={styles.categoryTitle}>{category}</Text>
                        <FlatList
                            data={groupedChallenges[category]}
                            renderItem={renderChallengeCard}
                            keyExtractor={(item) => item.id}
                            scrollEnabled={false} // Disable inner scroll for FlatList as we use ScrollView
                            contentContainerStyle={styles.listContent}
                        />
                    </View>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#FCE4EC', // Very light pink/blush background for overall app
    },
    header: {
        backgroundColor: '#FF69B4', // Hot Pink for the header background
        paddingTop: 20, // Adjust for top spacing
        paddingBottom: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomLeftRadius: 30, // Rounded bottom corners for the header
        borderBottomRightRadius: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 10,
        marginBottom: 20, // Space below header
    },
    headerImage: {
        width: 60, // Adjust size of the decorative image
        height: 60,
        resizeMode: 'contain',
        marginBottom: 10,
    },
    headerText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 28,
        fontFamily: 'Fredoka', // Assuming Fredoka is loaded
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
    scrollViewContent: {
        paddingVertical: 10, // Padding for the scrollable content
    },
    categorySection: {
        marginBottom: 25, // More space between categories
        paddingHorizontal: 20, // Consistent horizontal padding
    },
    categoryTitle: {
        fontFamily: 'Fredoka',
        fontSize: 24, // Slightly smaller for better hierarchy
        fontWeight: 'bold',
        color: '#FF2B8D', // Deep pink for category titles
        marginBottom: 15, // Space below title
        textTransform: 'uppercase',
        textAlign: 'center', // Center category titles
        backgroundColor: '#FFD700', // Yellow background for category title
        paddingVertical: 8,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
    },
    listContent: {
        // No specific padding, handled by card margins
    },
    card: {
        backgroundColor: '#FFFFFF', // White background for cards
        borderRadius: 20, // More rounded corners
        padding: 15,
        marginBottom: 20, // More space between cards
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.15, // Stronger shadow for depth
        shadowRadius: 8,
        elevation: 8,
        borderWidth: 1,
        borderColor: '#FFC0CB', // Light pink border
    },
    cardContent: {
        flexDirection: 'row', // Image and text side-by-side
        alignItems: 'center',
        marginBottom: 15, // Space between content and button
    },
    cardImage: {
        width: 80, // Larger image
        height: 80,
        borderRadius: 15, // Match card radius
        marginRight: 15,
        borderWidth: 2,
        borderColor: '#FFB6C1', // Soft pink border around image
        resizeMode: 'contain', // Ensure image scales nicely
    },
    cardTextContainer: {
        flex: 1, // Allow text to take available space
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FF2B8D', // Deep pink for title
        marginBottom: 5,
        fontFamily: 'Fredoka',
    },
    cardGoal: {
        fontSize: 15,
        color: '#555', // Darker gray for goal text
        fontFamily: 'Fredoka',
        lineHeight: 22, // Better readability
    },
    cardMeta: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    cardIcon: {
        fontSize: 20,
        marginRight: 8,
    },
    cardDuration: {
        fontSize: 14,
        color: '#888', // Softer color for duration
        fontFamily: 'Fredoka',
    },
    detailsButton: {
        backgroundColor: '#FF69B4', // Vibrant pink button
        paddingVertical: 12,
        borderRadius: 15, // Rounded button
        alignSelf: 'stretch', // Make button full width
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    },
    detailsButtonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
        fontFamily: 'Fredoka',
    },
});

export default ChallengeListScreen;
