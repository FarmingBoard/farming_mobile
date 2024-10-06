import React, { useEffect } from 'react';
import { View, Text, PermissionsAndroid, Platform } from 'react-native';
import BleManager from 'react-native-ble-manager';

const DevicePage = () => {
    useEffect(() => {
        const start = async () => {
            if (Platform.OS === 'android') {
                await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.BLUETOOTH);
                await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.BLUETOOTH_ADMIN);
                await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
            }

            BleManager.start({ showAlert: false });
        };

        start();
    }, []);

    return (
        <View>
            <Text>Device Page</Text>
        </View>
    );
};

export default DevicePage;
