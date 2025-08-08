import { useState } from 'react';
import { StyleSheet, View, Button, ScrollView, Text, TouchableOpacity } from 'react-native';
import RNBluetoothClassic from 'react-native-bluetooth-classic';
import { BluetoothDevice } from 'react-native-bluetooth-classic';
import { requestBluetoothPermission } from './hooks/useBluetooth'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { ActivityIndicator } from 'react-native'
import MyHouse from './components/MyHouse/MyHouse';
import { DeviceProvider } from './context/DeviceContext';

import { useContext } from 'react';
import { DeviceContext } from './context/DeviceContext';

const NAME_OF_TARGET_DEVICE = "CASA-DOMOTICA"

export default function App() {
    return (
        <SafeAreaProvider>
            <DeviceProvider>
                <SafeApp/>
            </DeviceProvider>
        </SafeAreaProvider>
    );
}

const SafeApp = () => {
    // const [device, setDevice] = useState<BluetoothDevice | null>(null);
    const context = useContext(DeviceContext);
    if (!context) throw new Error('DeviceContext debe usarse dentro de DeviceProvider');

    const { device, setDevice } = context;
    const [connectedDevice, setConnectedDevice] = useState<boolean>(false);
    const [connecting, setConnecting] = useState<boolean>(false);

    const sendDataToDevice = async (data: string) => {
        let isConnected = await device?.isConnected(); 
        if (!isConnected) {
            isConnected = await device?.connect();
            if (!isConnected) {
                console.error("No se pudo conectar al dispositivo");
                return;
            }
        }
        console.log("Sending \"", data, "\"");
        await device?.write(data);
    };

    const insets = useSafeAreaInsets();

    return (
        <View style={[styles.outerContainer, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
            <LinearGradient
                colors={['#0088BB', '#000000']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{ flex: 1 }}
            >
                <ScrollView contentContainerStyle={{...styles.container, ...(connectedDevice ? {} : { flex: 1, justifyContent: 'center'})}}>
                    {
                        connectedDevice ? (
                            <MyHouse />
                        ) : (
                            connecting ? <ActivityIndicator size="large" color="#fff" /> : (
                                <TouchableOpacity style={{backgroundColor: '#FFFFFF22'}} onPress={async () => {
                                    console.log("Click at ", Date.now())
                                    let hasPermission = await requestBluetoothPermission()
                                    if (hasPermission) {
                                        let bluetoothEnabled = await RNBluetoothClassic.isBluetoothEnabled();
                                        if(bluetoothEnabled) {
                                            let devices = await RNBluetoothClassic.getBondedDevices();
                                            console.log("devices count: ", devices.length);
                                            devices.map(async (iterDevice) => {
                                                if(iterDevice.name == NAME_OF_TARGET_DEVICE) {
                                                    setDevice(iterDevice);
                                                    let connected = await iterDevice.isConnected();
                                                    if(!connected) {
                                                        setConnecting(true);
                                                        iterDevice.connect().then((resultConnection) => {
                                                            setConnectedDevice(resultConnection);
                                                            setConnecting(false);
                                                        });
                                                    }
                                                    else {
                                                        setConnectedDevice(true);
                                                    }
                                                }
                                            });
                                        }
                                    }
                                }}>
                                    <Text style={{color: 'white', padding: 20, fontSize: 30}}>Buscar casa</Text>
                                </TouchableOpacity>
                            )
                        )
                    }
                    </ScrollView>
            </LinearGradient>
        </View>
    );

    // return (
    // <View style={styles.container}>
    //     {
    //         device ? (
    //             <>
    //                 <Button title='On' onPress={async () => {
    //                     sendDataToDevice("T");
    //                 }}></Button>
    //                 <Button title='Off' onPress={async () => {
    //                     sendDataToDevice("t");
    //                 }}></Button>
    //             </>
    //         ) : (

    //         )
    //     }
    // </View>
    // );
}

const styles = StyleSheet.create({
    outerContainer: {
        backgroundColor: '#000',
        flex: 1,
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        paddingBottom: 50,
        gap: 10,
        //FOR DEBUG
        borderWidth: 2,
        borderColor: 'red',
    },
    box: {
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.5)',
        padding: 20,
        borderRadius: 10,
        overflow: 'hidden',
        width: '80%',
        aspectRatio: 3,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    title: {
        color: 'white',
        fontSize: 50    
    },
    subTitle: {
        color: 'black',
        fontSize: 25    
    },
});