import React from 'react';
import {View, Text, StyleSheet, ScrollView, Image, TouchableOpacity} from 'react-native';

const ArticleDetailScreen = ({ route , navigation}) => {
    const { article } = route.params;

    return (
        <ScrollView style={articleDetailStyles.container}>
            <TouchableOpacity onPress={() => {navigation.goBack()}} style={{position: 'absolute', left: 0, top: 40, width: '100%'}}>
                <Image source={require('../assets/img/g69.png')}/>
            </TouchableOpacity>
            <View style={{alignItems: 'center', justifyContent: 'center', paddingVertical: 20}}>
                <Image source={require('../assets/img/g7.png')}/>
                <Text style={{color:'white', fontWeight: 'bold',position: 'absolute', fontSize: 16, fontFamily: 'Fredoka'}}>
                    Smart Habits
                </Text>
            </View>
            <View style={articleDetailStyles.header}>
                <Text style={articleDetailStyles.title}>{article.title}</Text>
            </View>

            <View style={articleDetailStyles.contentSection}>
                <Text style={articleDetailStyles.content}>{article.summary}</Text>
                <Text style={articleDetailStyles.content}>{article.content}</Text>
            </View>
        </ScrollView>
    );
};

const articleDetailStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FF2B8D', // Light grey background
        padding: 20,
    },
    header: {
        alignItems: 'center',
        marginBottom: 30,
        backgroundColor: '#FFCC00', // Yellow background for header
        paddingVertical: 20,
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#E02B82',
        fontFamily: 'Fredoka',
        textAlign: 'center',
    },
    contentSection: {
        borderRadius: 15,
        padding: 20,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        borderWidth: 1,
        borderColor: '#FFD700', // Gold border
    },
    content: {
        fontSize: 26,
        color: '#fff',
        lineHeight: 24,
        marginBottom: 10,
        fontFamily: 'Fredoka',
    },
});

export default ArticleDetailScreen;
