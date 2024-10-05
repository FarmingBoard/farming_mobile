import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Header({ name = "Garden Owner" }) {
    return (
        <View style={styles.container}>
            <View style={styles.leftSection}>
                <Image
                    source={require('../../assets/logo.jpg')}
                    style={styles.avatar}
                />
                <View style={styles.textContainer}>
                    <Text style={styles.helloText}>Hello</Text>
                    <Text style={styles.nameText}>{name}</Text>
                </View>
            </View>
            <TouchableOpacity style={styles.notificationIcon}>
                <Ionicons name="notifications-outline" size={24} color="black" />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#fff',
    },
    leftSection: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    textContainer: {
        marginLeft: 10,
    },
    helloText: {
        fontSize: 14,
        color: '#A9C4A9', // Màu xanh nhạt
    },
    nameText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
    },
    notificationIcon: {
        position: 'relative',
    },
    notificationDot: {
        position: 'absolute',
        top: -2,
        right: -2,
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#FF7E44', // Màu cam
    },
});