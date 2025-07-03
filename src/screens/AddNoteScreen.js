// screens/AddNoteScreen.js
import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    ImageBackground,
    Image,
    KeyboardAvoidingView, // Для обработки клавиатуры
    Platform, Alert, // Для Platform.OS
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {addNoteToEvent} from "../redux/slices/eventsSlice";

function AddNoteScreen({ navigation, route }) {
    const dispatch = useDispatch();
    const { eventId, selectedDate } = route.params; // Получаем eventId и selectedDate из параметров навигации


    const [noteText, setNoteText] = useState();

    const handleSaveNote = () => {
        if (!noteText || noteText.trim() === '') {
            Alert.alert('Empty Note', 'Please enter some text before saving.');
            return;
        }

        dispatch(addNoteToEvent({
            eventId,
            note: noteText.trim(),
        }));

        Alert.alert('Note Saved', 'Your note has been added.', [
            { text: 'OK', onPress: () => navigation.goBack() }
        ]);
    };

    return (
        <SafeAreaView style={styles.fullScreen}>
            <View

                style={styles.backgroundImage}
            >
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={styles.keyboardAvoidingView}
                >
                    {/* Header */}
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                            <Image
                                source={require('../assets/img/g69.png')} // Замените на иконку стрелки назад
                                style={styles.backIcon}
                            />
                        </TouchableOpacity>
                        <View style={styles.noteTitleContainer}>
                            <Text style={styles.noteTitleText}>Note</Text>
                        </View>
                    </View>

                    {/* Image Decorations */}
                    {/*<Image source={require('../assets/apple.png')} style={styles.appleImage} />*/}
                    {/*<Image source={require('../assets/blueberries.png')} style={styles.blueberriesImage} />*/}

                    <View style={styles.contentContainer}>
                        <Text style={styles.questionText}>
                            Want to reflect on your day? Write anything you'd like to remember.
                        </Text>

                        <TextInput
                            style={styles.noteInput}
                            multiline
                            placeholder="Start typing your note here..."
                            placeholderTextColor="#FFF9C4"
                            value={noteText}
                            onChangeText={setNoteText}
                        />

                        <TouchableOpacity style={styles.saveNoteButton} onPress={handleSaveNote}>
                            <Text style={styles.saveNoteButtonText}>Save Note</Text>
                        </TouchableOpacity>
                    </View>

                    {/* More Image Decorations */}
                    {/*<Image source={require('../assets/donut.png')} style={styles.donutImage} />*/}
                    {/*<Image source={require('../assets/strawberry.png')} style={styles.strawberryImage} />*/}
                </KeyboardAvoidingView>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    fullScreen: {
        flex: 1,
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover', // or 'stretch'
        justifyContent: 'flex-start', // Выравнивание содержимого по верху
        paddingBottom: Platform.OS === 'android' ? 20 : 0,
        backgroundColor: '#FF2B8D',
    },
    keyboardAvoidingView: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center', // Центрируем "Note" по горизонтали
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginTop: Platform.OS === 'android' ? 0 : 10, // Отступ сверху для iOS
    },
    backButton: {
        position: 'absolute',
        left: 15,
        top: Platform.OS === 'android' ? 10 : 10,
        zIndex: 10, // Чтобы быть поверх других элементов
        padding: 5,
    },
    backIcon: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
    },
    noteTitleContainer: {
        backgroundColor: '#FFD700', // Желтый фон из примера
        borderRadius: 25,
        paddingVertical: 10,
        paddingHorizontal: 40,
    },
    noteTitleText: {
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    appleImage: {
        position: 'absolute',
        top: '15%', // Примерное позиционирование
        left: 0,
        width: 100,
        height: 100,
        resizeMode: 'contain',
        zIndex: -1, // За задним планом
    },
    blueberriesImage: {
        position: 'absolute',
        top: '10%',
        right: 0,
        width: 100,
        height: 100,
        resizeMode: 'contain',
        zIndex: -1,
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 20,
        marginTop: 50, // Отступ от заголовка
    },
    questionText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        marginBottom: 30,
        lineHeight: 30,
    },
    noteInput: {
        backgroundColor: '#CD5C5C', // Темно-розовый
        borderRadius: 20,
        width: '100%',
        minHeight: 150, // Минимальная высота
        padding: 20,
        fontSize: 16,
        color: 'white',
        textAlignVertical: 'top', // Выравнивание текста сверху для multiline
        marginBottom: 40,
        borderColor: 'rgba(255,255,255,0.3)', // Легкая рамка
        borderWidth: 1,
    },
    saveNoteButton: {
        backgroundColor: '#FFD700', // Желтый
        paddingVertical: 15,
        paddingHorizontal: 60,
        borderRadius: 30,
        shadowColor: '#000', // Тень для кнопки
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 8, // Для Android
    },
    saveNoteButtonText: {
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
    },
    donutImage: {
        position: 'absolute',
        bottom: '5%',
        left: -20, // Может выходить за экран
        width: 150,
        height: 150,
        resizeMode: 'contain',
        zIndex: -1,
    },
    strawberryImage: {
        position: 'absolute',
        bottom: '0%',
        right: 0,
        width: 100,
        height: 100,
        resizeMode: 'contain',
        zIndex: -1,
    },
});

export default AddNoteScreen;
