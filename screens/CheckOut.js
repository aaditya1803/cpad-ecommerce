// CheckoutScreen.js

import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

export function CheckoutScreen({ route }) {
    const { billText, total } = route.params;

    return (
        <View style={styles.container}>
            <View style={styles.billContainer}>
                <Text style={styles.billText}>{billText}</Text>
                <Text style={styles.total}>Total: ${total}</Text>
            </View>
            <Button title="Pay now" onPress={() => alert('Payment is doneee!')} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    billContainer: {
        borderWidth: 1,
        borderColor: '#333',
        borderRadius: 8,
        backgroundColor: 'white',
        padding: 10,
        marginBottom: 20,
    },
    billText: {
        fontSize: 18,
        textAlign: 'right',
    },
    total: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'right',
        marginTop: 10, // Add some margin between the bill and the total
    },
});
