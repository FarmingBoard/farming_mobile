import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function WeatherDisplay() {
    const [temperature, setTemperature] = useState(25);
    const [humidity, setHumidity] = useState(60);

    useEffect(() => {
        const interval = setInterval(() => {
            setTemperature(Math.floor(Math.random() * (35 - 15 + 1) + 15));
            setHumidity(Math.floor(Math.random() * (80 - 40 + 1) + 40));
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.card}>
                <View style={styles.infoContainer}>
                    <View style={styles.infoItem}>
                        <View style={[styles.iconBackground, { backgroundColor: '#FFCCCB' }]}>
                            <Feather name="thermometer" size={32} color="#FF6347" />
                        </View>
                        <Text style={styles.infoValue}>{temperature}°C</Text>
                        <Text style={styles.infoLabel}>Nhiệt độ</Text>
                    </View>
                    <View style={styles.infoItem}>
                        <View style={[styles.iconBackground, { backgroundColor: '#E6F3FF' }]}>
                            <Feather name="droplet" size={32} color="#4682B4" />
                        </View>
                        <Text style={styles.infoValue}>{humidity}%</Text>
                        <Text style={styles.infoLabel}>Độ ẩm</Text>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
    },
    card: {
        backgroundColor: '#F5F5F5',
        borderRadius: 20,
        padding: 20,
        width: '100%',
        maxWidth: 350,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        marginBottom: 20,
    },
    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    infoItem: {
        alignItems: 'center',
    },
    iconBackground: {
        borderRadius: 50,
        padding: 12,
        marginBottom: 8,
    },
    infoValue: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 4,
    },
    infoLabel: {
        fontSize: 16,
        color: '#666',
    },
});