import { useMemo, useState } from "react";
import { PermissionsAndroid, Platform } from "react-native";
import { BleManager } from "react-native-ble-plx";

function useBLE() {
    const bleManager = useMemo(() => new BleManager(), []);
    const [allDevices, setAllDevices] = useState([]);
    
    const requestAndroidPermissions = async () => {
        const bluetoothScanPermission = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
            {
                title: "Permiso para buscar el dispositivo",
                message: "La aplicacion requiere scaneo bluetooth",
                buttonPositive: "OK",
            }
        );
        const bluetoothConnectPermission = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
            {
                title: "Permiso para conectarse con el dispositivo",
                message: "La aplicacion requiere conexion bluetooth",
                buttonPositive: "OK",
            }
        );
        const bluetoothFineLocationPermission = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
                title: "Permiso para conectarse con el dispositivo",
                message: "La aplicacion requiere conexion bluetooth",
                buttonPositive: "OK",
            }
        );

        return (
            bluetoothScanPermission === "granted" && bluetoothConnectPermission === "granted"  && bluetoothFineLocationPermission === "granted"
        );
    };

    const requestPermissions = async() => {
        if(Platform.OS === "android") {
            const androidPermissions = requestAndroidPermissions();
            return androidPermissions;
        }
        return true;
    }

    const isDuplicateDevice = (devices, nextDevice) => devices.findIndex((device) => nextDevice.id === device.id) > -1;

    const scanPeripherals = () => {

        console.log("[i] Start scanning...");
        bleManager.startDeviceScan(null, null, (error, device) => {
            console.log("[i] Scanning return something...");
            if(error){
                console.error("[!]Error at devices scan: ", error);
            }
            else if(device) {
                setAllDevices((prevState) => {
                    console.log("[i] Device scanned:");
                    console.log("\t\tName: ", device.name);
                    console.log("\t\tId: ", device.id);
                    console.log("\t\tisConnectable: ", device.isConnectable);
                    console.log("\t\tlocalName: ", device.localName);
                    if(!isDuplicateDevice(prevState, device)) {
                        return [...prevState, device];
                    }
                    return prevState;
                })
            }
        });
    };

    return ({
        requestPermissions,
        scanPeripherals,
        allDevices,
    });
}

export default useBLE;