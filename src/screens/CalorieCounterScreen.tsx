import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Image,
    SafeAreaView,
    KeyboardAvoidingView, // Added for better keyboard handling
    Platform, // To check platform for KeyboardAvoidingView
} from 'react-native';

const CalorieCounterScreen = () => {
    const [foodItem, setFoodItem] = useState('');
    const [calories, setCalories] = useState('');
    const [eatenItems, setEatenItems] = useState([]);
    const [totalCalories, setTotalCalories] = useState(0);

    const addFoodItem = () => {
        const cal = parseFloat(calories);
        if (foodItem.trim() && !isNaN(cal) && cal > 0) {
            const newItem = {
                id: Date.now().toString(),
                name: foodItem.trim(),
                calories: cal,
            };
            setEatenItems([...eatenItems, newItem]);
            setTotalCalories(totalCalories + cal);
            setFoodItem('');
            setCalories('');
        } else {
            alert('Please enter a valid food item and calorie amount! 😅');
        }
    };

    const clearAll = () => {
        setEatenItems([]);
        setTotalCalories(0);
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView
                style={styles.keyboardAvoidingView}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <View style={styles.header}>
                    <Image source={require('../assets/img/g7.png')} style={styles.headerImage} />
                    <Text style={styles.headerText}>Calorie Tracker</Text>
                </View>

                <ScrollView contentContainerStyle={styles.scrollViewContent}>
                    <View style={styles.inputSection}>
                        <Text style={styles.inputLabel}>Food Item Name 🍎</Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder="e.g., Apple, Chicken Breast"
                            value={foodItem}
                            onChangeText={setFoodItem}
                            placeholderTextColor="#B0C4DE"
                        />

                        <Text style={styles.inputLabel}>Calories (per serving) 🔥</Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder="e.g., 95, 165"
                            keyboardType="numeric"
                            value={calories}
                            onChangeText={setCalories}
                            placeholderTextColor="#B0C4DE"
                        />

                        <TouchableOpacity style={styles.addButton} onPress={addFoodItem}>
                            <Text style={styles.addButtonText}>Add Food ➕</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.summarySection}>
                        <Text style={styles.summaryTitle}>Today's Intake 📊</Text>
                        {eatenItems.length === 0 ? (
                            <Text style={styles.noItemsText}>No items added yet. Start tracking! ✨</Text>
                        ) : (
                            <View>
                                {eatenItems.map((item) => (
                                    <View key={item.id} style={styles.eatenItem}>
                                        <Text style={styles.eatenItemName}>{item.name}</Text>
                                        <Text style={styles.eatenItemCalories}>{item.calories} kcal</Text>
                                    </View>
                                ))}
                            </View>
                        )}
                        <View style={styles.totalCaloriesContainer}>
                            <Text style={styles.totalCaloriesText}>Total Calories: </Text>
                            <Text style={styles.totalCaloriesValue}>{totalCalories.toFixed(0)} kcal</Text>
                        </View>
                        {eatenItems.length > 0 && (
                            <TouchableOpacity style={styles.clearButton} onPress={clearAll}>
                                <Text style={styles.clearButtonText}>Clear All 🧹</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#F0E6FA', // Very light lavender/purple background for overall app
    },
    keyboardAvoidingView: {
        flex: 1,
    },
    header: {
        backgroundColor: '#8A2BE2', // BlueViolet for the header background
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
        tintColor: '#FFF', // Assuming g7.png is tintable, make it white for contrast
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
        paddingHorizontal: 20,
    },
    inputSection: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 20,
        marginBottom: 25,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 8,
        borderWidth: 1,
        borderColor: '#DDA0DD', // Plum/light purple border
    },
    inputLabel: {
        fontFamily: 'Fredoka',
        fontSize: 18,
        fontWeight: '600',
        color: '#8A2BE2', // BlueViolet for input labels
        marginBottom: 8,
    },
    textInput: {
        backgroundColor: '#F8F0FF', // Very light pale purple for input fields
        borderRadius: 10,
        paddingVertical: 12,
        paddingHorizontal: 15,
        fontSize: 16,
        color: '#333',
        marginBottom: 15,
        fontFamily: 'Fredoka',
        borderWidth: 1,
        borderColor: '#C5A0D6', // Lighter violet border
    },
    addButton: {
        backgroundColor: '#9370DB', // MediumPurple for add button
        paddingVertical: 14,
        borderRadius: 15,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
        marginTop: 10,
    },
    addButtonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 18,
        fontFamily: 'Fredoka',
    },
    summarySection: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 20,
        marginBottom: 25,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 8,
        borderWidth: 1,
        borderColor: '#DDA0DD', // Plum/light purple border
    },
    summaryTitle: {
        fontFamily: 'Fredoka',
        fontSize: 24,
        fontWeight: 'bold',
        color: '#8A2BE2', // BlueViolet for summary title
        marginBottom: 15,
        textAlign: 'center',
        textTransform: 'uppercase',
    },
    eatenItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#F0E6FA', // Very light lavender for separator
    },
    eatenItemName: {
        fontSize: 16,
        color: '#555',
        fontFamily: 'Fredoka',
        flex: 1,
    },
    eatenItemCalories: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#9370DB', // MediumPurple for calorie amount
        fontFamily: 'Fredoka',
    },
    noItemsText: {
        fontSize: 16,
        color: '#888',
        fontFamily: 'Fredoka',
        textAlign: 'center',
        paddingVertical: 20,
    },
    totalCaloriesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,
        paddingTop: 15,
        borderTopWidth: 2,
        borderTopColor: '#DDA0DD', // Plum/light purple separator
    },
    totalCaloriesText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#8A2BE2', // BlueViolet for total calories text
        fontFamily: 'Fredoka',
    },
    totalCaloriesValue: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#6A5ACD', // SlateBlue (deep purple) for the total value
        fontFamily: 'Fredoka',
    },
    clearButton: {
        backgroundColor: '#C5A0D6', // Lighter violet for clear button
        paddingVertical: 12,
        borderRadius: 15,
        alignItems: 'center',
        marginTop: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    },
    clearButtonText: {
        color: '#FFF', // White text for clear button
        fontWeight: 'bold',
        fontSize: 16,
        fontFamily: 'Fredoka',
    },
});

export default CalorieCounterScreen;
