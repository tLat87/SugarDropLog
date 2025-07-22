// import React from 'react';
// import {
//     View,
//     Text,
//     StyleSheet,
//     ScrollView,
//     Image,
//     TouchableOpacity,
//     SafeAreaView, // Added SafeAreaView for proper layout
// } from 'react-native';
//
// const ArticleDetailScreen = ({ route , navigation}) => {
//     const { article } = route.params;
//
//     return (
//         <SafeAreaView style={styles.safeArea}>
//             {/* Custom Header Bar */}
//             <View style={styles.headerBar}>
//                 <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
//                     <Image source={require('../assets/img/g69.png')} style={styles.backIcon}/>
//                 </TouchableOpacity>
//                 <Text style={styles.headerTitle}>Smart Habits</Text>
//             </View>
//
//             <ScrollView contentContainerStyle={styles.scrollViewContent}>
//                 {/* Article Title Section */}
//                 <View style={styles.articleTitleSection}>
//                     <Text style={styles.articleTitle}>{article.title}</Text>
//                 </View>
//
//                 {/* Article Content Section */}
//                 <View style={styles.contentSection}>
//                     <Text style={styles.summaryText}>{article.summary}</Text>
//                     {/* A visual separator for clarity between summary and full content */}
//                     <View style={styles.contentSeparator} />
//                     <Text style={styles.fullContentText}>{article.content}</Text>
//                 </View>
//
//                 <View style={{ marginBottom: 40 }} /> {/* Spacer for bottom */}
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
//         borderBottomLeftRadius: 30, // Rounded bottom corners
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
//         paddingHorizontal: 20, // Consistent horizontal padding
//         paddingBottom: 20, // Padding at the bottom of scroll view
//     },
//     articleTitleSection: {
//         alignItems: 'center',
//         marginBottom: 20,
//         backgroundColor: '#FFF', // White background for the title section
//         paddingVertical: 25,
//         borderRadius: 20,
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 4 },
//         shadowOpacity: 0.1,
//         shadowRadius: 8,
//         elevation: 8,
//         borderWidth: 1,
//         borderColor: '#FFC0CB', // Light pink border
//     },
//     articleTitle: {
//         fontSize: 28, // Prominent title
//         fontWeight: 'bold',
//         color: '#FF2B8D', // Deep pink for title
//         fontFamily: 'Fredoka',
//         textAlign: 'center',
//         paddingHorizontal: 15, // Padding inside the title section
//         lineHeight: 38, // Improve readability for multi-line titles
//     },
//     contentSection: {
//         backgroundColor: '#FFF', // White background for the main content
//         borderRadius: 20,
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
//     summaryText: {
//         fontSize: 18, // Slightly larger for summary
//         color: '#555', // Darker gray for readability
//         fontFamily: 'Fredoka',
//         lineHeight: 28, // Improved line height
//         marginBottom: 15, // Space before separator
//         fontWeight: 'bold', // Make summary stand out slightly
//     },
//     contentSeparator: {
//         height: 2, // A thin line separator
//         backgroundColor: '#FFD700', // Yellow color for emphasis
//         width: '60%', // Not full width to look more decorative
//         alignSelf: 'center', // Center the separator
//         marginVertical: 15, // Space above and below separator
//         borderRadius: 1,
//     },
//     fullContentText: {
//         fontSize: 16, // Standard content font size
//         color: '#666', // Slightly lighter gray for long text
//         fontFamily: 'Fredoka',
//         lineHeight: 26, // Improved line height for readability
//     },
// });
//
// export default ArticleDetailScreen;


import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    TouchableOpacity,
    SafeAreaView,
    Alert, // Added for user feedback
} from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage'; // To persist "read" status

// Define the types for your navigation stack parameters
type RootStackParamList = {
    ArticleDetailScreen: {
        article: {
            id: string; // Added 'id' for unique identification
            title: string;
            summary: string;
            content: string;
            // Add other properties of your article object if they exist
        };
    };
};

type ArticleDetailScreenProps = StackScreenProps<RootStackParamList, 'ArticleDetailScreen'>;

function ArticleDetailScreen({ route, navigation }: ArticleDetailScreenProps) {
    const { article } = route.params;
    const [isRead, setIsRead] = useState<boolean>(false);

    // Load the read status when the component mounts
    useEffect(() => {
        const loadReadStatus = async () => {
            try {
                const readArticles = await AsyncStorage.getItem('readArticles');
                const parsedReadArticles = readArticles ? JSON.parse(readArticles) : {};
                if (parsedReadArticles[article.id]) {
                    setIsRead(true);
                }
            } catch (error) {
                console.error('Failed to load read status:', error);
            }
        };
        loadReadStatus();
    }, [article.id]); // Dependency array includes article.id so it re-runs if article changes

    // Function to toggle and save the read status
    const handleMarkAsRead = async () => {
        const newReadStatus = !isRead;
        setIsRead(newReadStatus);

        try {
            const readArticles = await AsyncStorage.getItem('readArticles');
            let parsedReadArticles = readArticles ? JSON.parse(readArticles) : {};

            if (newReadStatus) {
                parsedReadArticles[article.id] = true;
                Alert.alert('Article Marked as Read!', 'Great job! You completed this article. 🎉', [{ text: 'OK' }]);
            } else {
                delete parsedReadArticles[article.id];
                Alert.alert('Article Marked as Unread', 'It will no longer appear as read. 😉', [{ text: 'OK' }]);
            }

            await AsyncStorage.setItem('readArticles', JSON.stringify(parsedReadArticles));
        } catch (error) {
            console.error('Failed to save read status:', error);
            Alert.alert('Error', 'Could not save read status. Please try again.', [{ text: 'OK' }]);
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            {/* Custom Header Bar */}
            <View style={styles.headerBar}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Image source={require('../assets/img/g69.png')} style={styles.backIcon} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Smart Habits</Text>
            </View>

            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                {/* Article Title Section */}
                <View style={styles.articleTitleSection}>
                    <Text style={styles.articleTitle}>{article.title}</Text>


                    {/* Article Content Section */}
                    <View style={styles.contentSection}>
                        <Text style={styles.summaryText}>{article.summary}</Text>
                        <View style={styles.contentSeparator} />
                        <Text style={styles.fullContentText}>{article.content}</Text>
                    </View>

                    {/* Mark as Read Button */}
                    <TouchableOpacity
                        style={[styles.markAsReadButton, isRead ? styles.markAsReadButtonRead : styles.markAsReadButtonUnread]}
                        onPress={handleMarkAsRead}
                    >
                        <Text style={styles.markAsReadButtonText}>
                            {isRead ? 'Mark as Unread ✅' : 'Mark as Read'}
                        </Text>
                    </TouchableOpacity>
                </View>
                    <View style={{ marginBottom: 40 }} /> {/* Spacer for bottom */}
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
    articleTitleSection: {
        alignItems: 'center',
            marginBottom: 20,
            backgroundColor: '#FFFFFF', // White background for the title section
            paddingVertical: 25,
            borderRadius: 20,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 8,
            borderWidth: 1,
            borderColor: '#DDA0DD', // Plum/light purple border
    },
    articleTitle: {
        fontSize: 28,
            fontWeight: 'bold',
            color: '#8A2BE2', // BlueViolet for title
            fontFamily: 'Fredoka',
            textAlign: 'center',
            paddingHorizontal: 15,
            lineHeight: 38,
    },
    contentSection: {
        backgroundColor: '#FFFFFF', // White background for the main content
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
    summaryText: {
        fontSize: 18,
            color: '#555',
            fontFamily: 'Fredoka',
            lineHeight: 28,
            marginBottom: 15,
            fontWeight: 'bold',
    },
    contentSeparator: {
        height: 2,
            backgroundColor: '#9370DB', // MediumPurple for the separator
            width: '60%',
            alignSelf: 'center',
            marginVertical: 15,
            borderRadius: 1,
    },
    fullContentText: {
        fontSize: 16,
            color: '#666',
            fontFamily: 'Fredoka',
            lineHeight: 26,
    },
    markAsReadButton: {
        borderRadius: 30,
            paddingVertical: 16,
            alignItems: 'center',
            justifyContent: 'center',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
            shadowRadius: 6,
            elevation: 7,
            marginTop: 10,
    },
    markAsReadButtonUnread: {
        backgroundColor: '#9370DB', // MediumPurple for unread state
    },
    markAsReadButtonRead: {
        backgroundColor: '#6A5ACD', // SlateBlue, a slightly darker purple for read state
    },
    markAsReadButtonText: {
        color: '#FFF',
            fontSize: 18,
        paddingHorizontal: 15,
            fontWeight: 'bold',
            fontFamily: 'Fredoka',
            textTransform: 'uppercase',
    },
});

export default ArticleDetailScreen;
