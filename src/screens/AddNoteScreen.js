import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    Image,
    KeyboardAvoidingView,
    Platform,
    Alert,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { addNoteToEvent } from "../redux/slices/eventsSlice";

function AddNoteScreen({ navigation, route }) {
    const dispatch = useDispatch();
    const { eventId, selectedDate } = route.params;

    const [noteText, setNoteText] = useState(''); // Initialize with empty string for controlled component

    const handleSaveNote = () => {
        if (noteText.trim() === '') {
            Alert.alert('Empty Note', 'Please enter some text before saving.', [
                { text: 'OK' }
            ]);
            return;
        }

        dispatch(addNoteToEvent({
            eventId,
            note: noteText.trim(),
            // You might want to add a timestamp to the note itself here if not already handled in the slice
            timestamp: new Date().toISOString(),
        }));

        Alert.alert('Note Saved', 'Your reflection has been added successfully! 🎉', [
            { text: 'OK', onPress: () => navigation.goBack() }
        ]);
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardAvoidingView}
            >
                {/* Header */}
                <View style={styles.headerBar}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <Image
                            source={require('../assets/img/g69.png')}
                            style={styles.backIcon}
                        />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Add Reflection</Text>
                </View>

                <ScrollView contentContainerStyle={styles.scrollViewContent}>
                    <View style={styles.promptContainer}>
                        <Text style={styles.promptText}>
                            Want to reflect on your day?
                        </Text>
                        <Text style={styles.subPromptText}>
                            Write anything you'd like to remember or track about your journey.
                        </Text>
                    </View>

                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.noteInput}
                            multiline
                            placeholder="Start typing your thoughts here..."
                            placeholderTextColor="#A9A9A9" // Darker placeholder for better contrast
                            value={noteText}
                            onChangeText={setNoteText}
                            autoCorrect={true} // Enable auto-correction
                            spellCheck={true} // Enable spell-check
                        />
                    </View>


                    <TouchableOpacity style={styles.saveNoteButton} onPress={handleSaveNote}>
                        <Text style={styles.saveNoteButtonText}>Save Reflection</Text>
                    </TouchableOpacity>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#FCE4EC', // Very light pink/blush background for overall app
    },
    keyboardAvoidingView: {
        flex: 1,
    },
    headerBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center', // Center the title
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
        flexGrow: 1, // Allows content to grow within scrollview
        paddingHorizontal: 20,
        paddingBottom: 20,
        justifyContent: 'space-between', // Pushes button to bottom if content is short
    },
    promptContainer: {
        backgroundColor: '#FFF', // White background for the prompt
        borderRadius: 20,
        padding: 20,
        marginBottom: 30, // More space
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 8,
        borderWidth: 1,
        borderColor: '#FFC0CB', // Light pink border
        alignItems: 'center', // Center text within prompt
    },
    promptText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FF2B8D', // Deep pink
        textAlign: 'center',
        marginBottom: 10,
        lineHeight: 32,
        fontFamily: 'Fredoka',
    },
    subPromptText: {
        fontSize: 16,
        color: '#555', // Darker gray for readability
        textAlign: 'center',
        lineHeight: 24,
        fontFamily: 'Fredoka',
    },
    inputContainer: {
        flex: 1, // Allows input to expand
        backgroundColor: '#FFF', // White background for the input area
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 8,
        borderWidth: 1,
        borderColor: '#FFC0CB',
        marginBottom: 30, // Space before button
    },
    noteInput: {
        flex: 1, // Allows TextInput to fill container
        padding: 20,
        fontSize: 18,
        color: '#333', // Darker text for input
        textAlignVertical: 'top', // Align text to top for multiline
        fontFamily: 'Fredoka',
    },
    saveNoteButton: {
        backgroundColor: '#28A745', // Vibrant green for "Save"
        borderRadius: 30, // Pill-shaped button
        paddingVertical: 18,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.25,
        shadowRadius: 10,
        elevation: 10,
    },
    saveNoteButtonText: {
        color: '#FFF',
        fontSize: 22,
        fontWeight: 'bold',
        fontFamily: 'Fredoka',
        textTransform: 'uppercase',
    },
});

export default AddNoteScreen;
