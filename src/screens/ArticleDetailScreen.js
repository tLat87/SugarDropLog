import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    TouchableOpacity,
    SafeAreaView, // Added SafeAreaView for proper layout
} from 'react-native';

const ArticleDetailScreen = ({ route , navigation}) => {
    const { article } = route.params;

    return (
        <SafeAreaView style={styles.safeArea}>
            {/* Custom Header Bar */}
            <View style={styles.headerBar}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Image source={require('../assets/img/g69.png')} style={styles.backIcon}/>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Smart Habits</Text>
            </View>

            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                {/* Article Title Section */}
                <View style={styles.articleTitleSection}>
                    <Text style={styles.articleTitle}>{article.title}</Text>
                </View>

                {/* Article Content Section */}
                <View style={styles.contentSection}>
                    <Text style={styles.summaryText}>{article.summary}</Text>
                    {/* A visual separator for clarity between summary and full content */}
                    <View style={styles.contentSeparator} />
                    <Text style={styles.fullContentText}>{article.content}</Text>
                </View>

                <View style={{ marginBottom: 40 }} /> {/* Spacer for bottom */}
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
        borderBottomLeftRadius: 30, // Rounded bottom corners
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
        paddingHorizontal: 20, // Consistent horizontal padding
        paddingBottom: 20, // Padding at the bottom of scroll view
    },
    articleTitleSection: {
        alignItems: 'center',
        marginBottom: 20,
        backgroundColor: '#FFF', // White background for the title section
        paddingVertical: 25,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 8,
        borderWidth: 1,
        borderColor: '#FFC0CB', // Light pink border
    },
    articleTitle: {
        fontSize: 28, // Prominent title
        fontWeight: 'bold',
        color: '#FF2B8D', // Deep pink for title
        fontFamily: 'Fredoka',
        textAlign: 'center',
        paddingHorizontal: 15, // Padding inside the title section
        lineHeight: 38, // Improve readability for multi-line titles
    },
    contentSection: {
        backgroundColor: '#FFF', // White background for the main content
        borderRadius: 20,
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
    summaryText: {
        fontSize: 18, // Slightly larger for summary
        color: '#555', // Darker gray for readability
        fontFamily: 'Fredoka',
        lineHeight: 28, // Improved line height
        marginBottom: 15, // Space before separator
        fontWeight: 'bold', // Make summary stand out slightly
    },
    contentSeparator: {
        height: 2, // A thin line separator
        backgroundColor: '#FFD700', // Yellow color for emphasis
        width: '60%', // Not full width to look more decorative
        alignSelf: 'center', // Center the separator
        marginVertical: 15, // Space above and below separator
        borderRadius: 1,
    },
    fullContentText: {
        fontSize: 16, // Standard content font size
        color: '#666', // Slightly lighter gray for long text
        fontFamily: 'Fredoka',
        lineHeight: 26, // Improved line height for readability
    },
});

export default ArticleDetailScreen;
