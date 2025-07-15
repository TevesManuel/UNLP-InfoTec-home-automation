import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import useBLE from './useBLE';

export default function App() {

    const {
        requestPermissions,
        scanPeripherals,
        allDevices,
    } = useBLE();

    const scanDevices = async () => {
        const isPermissionEnabled = await requestPermissions();
        if(isPermissionEnabled) {
            scanPeripherals();
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <Text>Hol soy la prueba</Text>
            {allDevices.map((device, index) => (
            <Text key={index}>{device.name ?? 'Sin nombre'}</Text>
            ))}
            <Button title='Escanear' onPress={()=>{
                scanDevices();
            }}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
