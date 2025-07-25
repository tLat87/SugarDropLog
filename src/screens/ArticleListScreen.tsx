import React, { useState, useEffect, useCallback } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Image,
    SafeAreaView,
    Alert,
} from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import for star icons

// Make sure you have react-native-vector-icons installed:
// npm install react-native-vector-icons
// npx react-native link react-native-vector-icons (for older RN versions)
// Don't forget to follow the post-installation steps for iOS/Android if using bare workflow.

// Define the type for an individual article
interface Article {
    id: string;
    category: string;
    title: string;
    summary: string;
    content: string;
}

// Define the types for your navigation stack parameters
type RootStackParamList = {
    ArticleListScreen: undefined;
    ArticleDetailScreen: { article: Article };
};

type ArticleListScreenProps = StackScreenProps<RootStackParamList, 'ArticleListScreen'>;

// Data for articles (kept the same as your original data)
const articles: Article[] = [
    {
        id: 'a1',
        category: 'Understanding Habits',
        title: 'Why We Crave Sugar',
        summary:
            'Sugar cravings can feel overwhelming, especially when they hit out of nowhere. But understanding why we crave sugar is the first step toward managing it. Sugar gives our brain a quick hit of dopamine — the feel-good chemical — which is why it feels so satisfying in the moment. Unfortunately, that feeling is short-lived, and often followed by a crash that leaves us even more tired or irritable than before.',
        content: `Many cravings are linked to habit, not hunger. Think about it — do you always reach for something sweet after lunch or during late-night Netflix sessions? These moments become wired into our routine, and our brain learns to expect sugar at those times. The craving becomes more about comfort than true need.

    Sleep, stress, and even dehydration can also affect sugar cravings. When you're tired, your body looks for quick energy. When you're stressed, sweets may offer emotional relief. And sometimes when you're just thirsty, your body can misinterpret it as a hunger for sweets.

    The good news? Cravings are not permanent. They come in waves and tend to pass if we give them a few minutes. When you feel one coming on, try pausing for five minutes. Drink a glass of water, take a short walk, or distract your mind with something else. The more you practice this, the easier it gets. You’re not fighting your cravings — you’re learning to ride them out.`,
    },
    {
        id: 'a2',
        category: 'Building Momentum',
        title: 'Small Wins Matter',
        summary:
            'When people start reducing sugar, they often go all in — and that’s great, but not always sustainable. The truth is, small wins build real change. Saying no to dessert once may not feel like a victory, but it is. Every time you make a mindful choice, you\'re rewiring your habits just a little more.',
        content: `The idea that we have to be perfect can hold us back. If you slip and have a cookie, it doesn't erase the five good days before it. In fact, what you do after a slip is far more important. Will you give up, or will you keep going? Real progress happens when you choose to continue after a detour.

    Tracking your actions, even imperfect ones, helps build awareness. That’s why daily logging is important — not to judge yourself, but to see your patterns. You may notice, for example, that weekends are tougher, or that stress triggers snacking. These are clues, not failures. Use them.

    Celebrate small wins like choosing fruit instead of soda, or stopping after one piece of chocolate instead of three. These changes add up. Small wins create momentum. And momentum is more powerful than motivation.`,
    },
    {
        id: 'a3',
        category: 'Nutrition Insights',
        title: 'Fruit Is Not the Enemy',
        summary:
            'In a world full of sugar warnings and low-carb trends, fruit sometimes gets lumped in with candy. But fruit isn’t the problem — it\'s part of the solution. Whole fruits like apples, oranges, berries, and bananas contain natural sugars, yes, but they also bring fiber, water, vitamins, and antioxidants your body needs.',
        content: `Unlike candy, fruit digests more slowly and doesn’t cause sharp blood sugar spikes. The fiber in fruit keeps you full longer, and the chewing process helps you feel satisfied. Try eating five jelly beans versus a fresh apple. The jelly beans are gone in seconds. The apple takes time, and leaves you nourished, not just filled.

    Fruit also satisfies your sweet tooth in a healthier way. Craving something cold and sweet? Try frozen grapes or a banana with peanut butter. Want dessert? Bake apples with cinnamon or blend frozen mango into a creamy smoothie.

    Fruits are nature’s original snacks. They don’t come in plastic, they don’t have ingredient lists, and they don’t need a label. When you're trying to cut back on processed sugar, fruit can be your friend. Not a cheat, not a compromise — just a smart, sweet choice.`,
    },
    {
        id: 'a4',
        category: 'Overcoming Setbacks',
        title: 'The Power of a Reset Day',
        summary:
            'Sometimes we have a rough day. Maybe you had a slice of cake at work, grabbed a sugary drink at lunch, and then gave in to ice cream at night. It happens. What matters most is what you do next — and that’s where a reset day comes in.',
        content: `A reset day is like pressing pause and starting fresh, without guilt. It’s not about punishment or “making up” for anything. It’s about clarity and intention. You simply choose to treat the next day as a clean slate. You commit to being mindful. You drink more water. You avoid added sugars. You check in with how your body feels when it’s not running on quick hits of sweetness.

    Having a reset day now and then helps you reconnect with your goals. It reminds you that you’re in control. When you break a pattern quickly, it doesn’t turn into a full setback. And when you succeed with just one good day, that confidence carries into the next.

    Try starting your reset day with a healthy breakfast. Prep your meals ahead. Keep fruit nearby. Mark the day in your tracker. And at the end, reflect — not on what you didn’t eat, but on how it felt to follow through.

    Resets are not about restriction. They’re about remembering what you’re capable of.`,
    },
    {
        id: 'a5',
        category: 'Understanding Habits',
        title: 'Sugar and Emotions',
        summary:
            'There’s a reason we call it comfort food. Sugar is tightly connected to how we feel — bored, sad, stressed, even happy. A celebration usually means cake. A breakup often brings ice cream. We don’t just eat sugar for taste. We eat it for emotion.',
        content: `Understanding this emotional link is powerful. It doesn’t mean sugar is bad. It means that when we crave something sweet, we can pause and ask: what am I really feeling? Am I tired? Lonely? Just in need of a break?

    When we respond to emotions with food, we sometimes delay the real need — like rest, connection, or calm. That’s why developing new coping habits can be life-changing. Instead of reaching for cookies, we can take a walk, call a friend, play music, or simply breathe.

    Of course, it’s okay to enjoy sweets sometimes. But when sugar becomes the go-to response for every emotion, we lose touch with ourselves. The next time a craving hits hard, try to sit with it for a moment. Feel the feeling instead of feeding it.

    You might be surprised how quickly the craving fades — and how good it feels to choose something different.`,
    },
];

const ArticleListScreen = ({ navigation }: ArticleListScreenProps) => {
    // State to store ratings: { [articleId: string]: number }
    const [articleRatings, setArticleRatings] = useState<Record<string, number>>({});

    // Function to load article ratings from AsyncStorage
    const loadArticleRatings = useCallback(async () => {
        try {
            const storedRatings = await AsyncStorage.getItem('articleRatings');
            const parsedRatings = storedRatings ? JSON.parse(storedRatings) : {};
            setArticleRatings(parsedRatings);
        } catch (error) {
            console.error('Failed to load article ratings:', error);
        }
    }, []);

    // Load ratings on initial mount and when the screen is focused again
    useEffect(() => {
        loadArticleRatings();
    }, [loadArticleRatings]);

    useFocusEffect(
        useCallback(() => {
            loadArticleRatings(); // Reload ratings when screen is focused
        }, [loadArticleRatings])
    );

    // Function to save a new rating for an article
    const handleSetRating = async (articleId: string, rating: number) => {
        try {
            const newRatings = { ...articleRatings, [articleId]: rating };
            setArticleRatings(newRatings);
            await AsyncStorage.setItem('articleRatings', JSON.stringify(newRatings));
            Alert.alert('Rating Saved! ⭐', `You rated this article ${rating} stars.`, [{ text: 'OK' }]);
        } catch (error) {
            console.error('Failed to save rating:', error);
            Alert.alert('Error', 'Could not save rating. Please try again.', [{ text: 'OK' }]);
        }
    };

    // Group articles by category
    const groupedArticles = articles.reduce((acc, article) => {
        (acc[article.category] = acc[article.category] || []).push(article);
        return acc;
    }, {} as Record<string, Article[]>);

    const renderArticleCard = ({ item }: { item: Article }) => {
        const currentRating = articleRatings[item.id] || 0; // Get current rating, default to 0

        return (
            <TouchableOpacity
                style={styles.card}
                onPress={() => navigation.navigate('ArticleDetailScreen', { article: item })}
            >
                <View style={styles.cardContent}>
                    <Text style={styles.cardTitle}>{item.title}</Text>
                    <Text style={styles.cardSummary}>{item.summary.substring(0, 150)}...</Text>
                </View>

                {/* Rating Section */}
                <View style={styles.ratingContainer}>
                    {[1, 2, 3, 4, 5].map((star) => (
                        <TouchableOpacity
                            key={star}
                            onPress={() => handleSetRating(item.id, star)}
                            style={styles.starButton}
                        >
                            <Icon
                                name={star <= currentRating ? 'star' : 'star-o'} // 'star' for filled, 'star-o' for outline
                                size={22}
                                color={star <= currentRating ? '#FFD700' : '#C5A0D6'} // Gold for filled, light violet for outline
                            />
                        </TouchableOpacity>
                    ))}
                    {currentRating > 0 && <Text style={styles.currentRatingText}>{currentRating}/5</Text>}
                </View>

                <TouchableOpacity
                    style={styles.readButton}
                    onPress={() => navigation.navigate('ArticleDetailScreen', { article: item })}
                >
                    <Text style={styles.readButtonText}>Read Article</Text>
                    <Text style={styles.readButtonArrow}>→</Text>
                </TouchableOpacity>
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <Image source={require('../assets/img/g7.png')} style={styles.headerImage} />
                <Text style={styles.headerText}>Smart Habits</Text>
            </View>

            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                {Object.keys(groupedArticles).map((category) => (
                    <View key={category} style={styles.categorySection}>
                        <Text style={styles.categoryTitle}>{category}</Text>
                        <FlatList
                            data={groupedArticles[category]}
                            renderItem={renderArticleCard}
                            keyExtractor={(item) => item.id}
                            scrollEnabled={false}
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
        backgroundColor: '#F0E6FA', // Very light lavender/purple background
    },
    header: {
        backgroundColor: '#8A2BE2', // BlueViolet for header
        paddingTop: 20,
        paddingBottom: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 10,
        marginBottom: 20,
    },
    headerImage: {
        width: 60,
        height: 60,
        resizeMode: 'contain',
        marginBottom: 10,
    },
    headerText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 28,
        fontFamily: 'Fredoka',
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
    scrollViewContent: {
        paddingVertical: 10,
    },
    categorySection: {
        marginBottom: 25,
        paddingHorizontal: 20,
    },
    categoryTitle: {
        fontFamily: 'Fredoka',
        fontSize: 22,
        fontWeight: 'bold',
        color: '#8A2BE2', // BlueViolet for category titles
        marginBottom: 15,
        textAlign: 'center',
        backgroundColor: '#DDA0DD', // Plum/light purple background for category title
        paddingVertical: 8,
        borderRadius: 10,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.5)',
    },
    listContent: {
        // No specific padding, handled by card margins
    },
    card: {
        backgroundColor: '#FFFFFF', // White background for cards
        borderRadius: 20,
        padding: 20,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 8,
        borderWidth: 1,
        borderColor: '#DDA0DD', // Plum/light purple border
    },
    cardContent: {
        marginBottom: 10, // Space between content and rating
    },
    cardTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#8A2BE2', // BlueViolet for title
        fontFamily: 'Fredoka',
        marginBottom: 8,
        lineHeight: 28,
    },
    cardSummary: {
        fontSize: 16,
        color: '#555',
        fontFamily: 'Fredoka',
        lineHeight: 24,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15, // Space between rating and read button
        marginTop: 10, // Space between summary and rating
    },
    starButton: {
        paddingHorizontal: 4, // Adjust spacing between stars
    },
    currentRatingText: {
        marginLeft: 10,
        fontSize: 16,
        fontWeight: 'bold',
        color: '#9370DB', // MediumPurple for the rating text
        fontFamily: 'Fredoka',
    },
    readButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#9370DB', // MediumPurple button
        paddingVertical: 14,
        borderRadius: 15,
        alignSelf: 'stretch',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
        marginTop: 10,
    },
    readButtonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 18,
        fontFamily: 'Fredoka',
        marginRight: 8,
    },
    readButtonArrow: {
        color: '#FFF',
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default ArticleListScreen;
