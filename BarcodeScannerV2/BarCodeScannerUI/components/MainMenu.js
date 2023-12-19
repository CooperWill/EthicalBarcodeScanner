import React from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // Or import from 'react-native-vector-icons/FontAwesome'

const MainMenuScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Pressable
                style={styles.buttonContainer}
                onPress={() => navigation.navigate('BarcodeScanner')}
            >
                <View style={styles.button}>
                    <FontAwesome name="barcode" size={20} color="white" style={styles.buttonIcon} />
                    <Text style={styles.buttonLabel}>Go to Barcode Scanner</Text>
                </View>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#25292e',
    },
    buttonContainer: {
        borderRadius: 10,
        backgroundColor: '#505357', // Change as needed
        padding: 10,
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonIcon: {
        marginRight: 8,
    },
    buttonLabel: {
        color: '#fff',
        fontSize: 16,
    },
});

export default MainMenuScreen;
