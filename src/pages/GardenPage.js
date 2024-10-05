import React from "react";
import { View, Text, StyleSheet } from 'react-native';
import HeaderDisplay from '../components/HeaderDisplay';
import WeatherDisplay from "../components/WeatherDisplay";

export default function GardenPage() {
    return (
        <View>
            <HeaderDisplay />
            <View style={styles.container}>
                <Text style={styles.title}>Nhiệt độ, độ ẩm</Text>
                <WeatherDisplay />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 16,
    },
    text: {
        fontSize: 16,
    },
    button: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
}); 