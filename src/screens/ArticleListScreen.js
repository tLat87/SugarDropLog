import React from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    ScrollView, Image,
} from 'react-native';

// Data for articles
const articles = [
    {
        id: 'a1',
        title: 'Why We Crave Sugar',
        summary:
            'Sugar cravings can feel overwhelming, especially when they hit out of nowhere. But understanding why we crave sugar is the first step toward managing it. Sugar gives our brain a quick hit of dopamine — the feel-good chemical — which is why it feels so satisfying in the moment. Unfortunately, that feeling is short-lived, and often followed by a crash that leaves us even more tired or irritable than before.',
        content: `Many cravings are linked to habit, not hunger. Think about it — do you always reach for something sweet after lunch or during late-night Netflix sessions? These moments become wired into our routine, and our brain learns to expect sugar at those times. The craving becomes more about comfort than true need.
    
    Sleep, stress, and even dehydration can also affect sugar cravings. When you're tired, your body looks for quick energy. When you're stressed, sweets may offer emotional relief. And sometimes when you're just thirsty, your body can misinterpret it as a hunger for sweets.
    
    The good news? Cravings are not permanent. They come in waves and tend to pass if we give them a few minutes. When you feel one coming on, try pausing for five minutes. Drink a glass of water, take a short walk, or distract your mind with something else. The more you practice this, the easier it gets. You’re not fighting your cravings — you’re learning to ride them out.`,
    },
    {
        id: 'a2',
        title: 'Small Wins Matter',
        summary:
            'When people start reducing sugar, they often go all in — and that’s great, but not always sustainable. The truth is, small wins build real change. Saying no to dessert once may not feel like a victory, but it is. Every time you make a mindful choice, you\'re rewiring your habits just a little more.',
        content: `The idea that we have to be perfect can hold us back. If you slip and have a cookie, it doesn't erase the five good days before it. In fact, what you do after a slip is far more important. Will you give up, or will you keep going? Real progress happens when you choose to continue after a detour.
    
    Tracking your actions, even imperfect ones, helps build awareness. That’s why daily logging is important — not to judge yourself, but to see your patterns. You may notice, for example, that weekends are tougher, or that stress triggers snacking. These are clues, not failures. Use them.
    
    Celebrate small wins like choosing fruit instead of soda, or stopping after one piece of chocolate instead of three. These changes add up. Small wins create momentum. And momentum is more powerful than motivation.`,
    },
    {
        id: 'a3',
        title: 'Fruit Is Not the Enemy',
        summary:
            'In a world full of sugar warnings and low-carb trends, fruit sometimes gets lumped in with candy. But fruit isn’t the problem — it\'s part of the solution. Whole fruits like apples, oranges, berries, and bananas contain natural sugars, yes, but they also bring fiber, water, vitamins, and antioxidants your body needs.',
        content: `Unlike candy, fruit digests more slowly and doesn’t cause sharp blood sugar spikes. The fiber in fruit keeps you full longer, and the chewing process helps you feel satisfied. Try eating five jelly beans versus a fresh apple. The jelly beans are gone in seconds. The apple takes time, and leaves you nourished, not just filled.
    
    Fruit also satisfies your sweet tooth in a healthier way. Craving something cold and sweet? Try frozen grapes or a banana with peanut butter. Want dessert? Bake apples with cinnamon or blend frozen mango into a creamy smoothie.
    
    Fruits are nature’s original snacks. They don’t come in plastic, they don’t have ingredient lists, and they don’t need a label. When you're trying to cut back on processed sugar, fruit can be your friend. Not a cheat, not a compromise — just a smart, sweet choice.`,
    },
    {
        id: 'a4',
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
        title: 'Sugar and Emotions',
        summary:
            'There’s a reason we call it comfort food. Sugar is tightly connected to how we feel — bored, sad, stressed, even happy. A celebration usually means cake. A breakup often brings ice cream. We don’t just eat sugar for taste. We eat it for emotion.',
        content: `Understanding this emotional link is powerful. It doesn’t mean sugar is bad. It means that when we crave something sweet, we can pause and ask: what am I really feeling? Am I tired? Lonely? Just in need of a break?
    
    When we respond to emotions with food, we sometimes delay the real need — like rest, connection, or calm. That’s why developing new coping habits can be life-changing. Instead of reaching for cookies, we can take a walk, call a friend, play music, or simply breathe.
    
    Of course, it’s okay to enjoy sweets sometimes. But when sugar becomes the go-to response for every emotion, we lose touch with ourselves. The next time a craving hits hard, try to sit with it for a moment. Feel the feeling instead of feeding it.
    
    You might be surprised how quickly the craving fades — and how good it feels to choose something different.`,
    },
];

const ArticleListScreen = ({ navigation }) => {
    const renderArticleCard = ({ item }) => (
        <TouchableOpacity
            style={articleListStyles.card}
            onPress={() => navigation.navigate('ArticleDetailScreen', { article: item })}
        >
            <Text style={articleListStyles.cardTitle}>{item.title}</Text>
            <Text style={articleListStyles.cardSummary}>{item.summary.substring(0, 100)}...</Text>
            <TouchableOpacity
                style={articleListStyles.readButton}
                onPress={() => navigation.navigate('ArticleDetailScreen', { article: item })}
            >
                <Text style={articleListStyles.readButtonText}>Read</Text>
            </TouchableOpacity>
        </TouchableOpacity>
    );

    return (
        <ScrollView style={articleListStyles.container}>
            <View style={{alignItems: 'center', justifyContent: 'center', paddingVertical: 20}}>
                <Image source={require('../assets/img/g7.png')}/>
                <Text style={{color:'white', fontWeight: 'bold',position: 'absolute', fontSize: 16, fontFamily: 'Fredoka'}}>
                    Smart Habits
                </Text>
            </View>
            <FlatList
                data={articles}
                renderItem={renderArticleCard}
                keyExtractor={(item) => item.id}
                scrollEnabled={false}
                contentContainerStyle={articleListStyles.listContent}
            />
            <View style={{marginBottom: 100}}/>
        </ScrollView>
    );
};

const articleListStyles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 40,
        backgroundColor: '#FF2B8D', // Light grey background
        paddingVertical: 20,
        paddingHorizontal: 15,
    },
    listContent: {
        paddingBottom: 10,
    },
    card: {
        backgroundColor: '#FFCC00', // Yellow background for articles
        borderRadius: 15,
        padding: 20,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        borderWidth: 1,
        borderColor: '#FFD700', // Gold border
    },
    cardTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#E02B82',
        fontFamily: 'Fredoka',
        marginBottom: 5,
    },
    cardSummary: {
        fontSize: 20,
        color: '#fff',
        fontFamily: 'Fredoka',
        marginBottom: 15,
    },
    readButton: {
        backgroundColor: '#FF69B4', // Pink button
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 10,
        alignSelf: 'flex-start',
    },
    readButtonText: {
        fontFamily: 'Fredoka',
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 24,
    },
});

export default ArticleListScreen;
