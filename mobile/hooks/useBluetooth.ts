import { PermissionsAndroid, Platform } from 'react-native';

export async function requestBluetoothPermission(){
    try {
        const grantedScan = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
            {
                title: 'Bluetooth Scan Permission',
                message: 'This app needs Bluetooth Scan permission to discover devices.',
                buttonPositive: 'OK',
                buttonNegative: 'Cancel',
            }
        );

        const grantedConnect = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
            {
                title: 'Bluetooth Connect Permission',
                message: 'This app needs Bluetooth Connect permission to connect to devices.',
                buttonPositive: 'OK',
                buttonNegative: 'Cancel',
            }
        );
        
        const grantedLocation = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
                title: 'Fine Location Permission',
                message: 'This app needs to know location of device.',
                buttonPositive: 'OK',
                buttonNegative: 'Cancel',
            }
        );

        if (
            grantedScan === PermissionsAndroid.RESULTS.GRANTED &&
            grantedConnect === PermissionsAndroid.RESULTS.GRANTED &&
            grantedLocation === PermissionsAndroid.RESULTS.GRANTED
        ) {
            // console.log('Bluetooth permissions granted');
            return true;
        } else {
            // console.log('Bluetooth permissions denied');
            return false;
        }
    } catch (err) {
        console.warn(err);
        return false;
    }
}