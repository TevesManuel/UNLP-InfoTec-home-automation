import HomeSVG from './../HouseSVG/HouseSVG';
import { TouchableOpacity } from 'react-native';
import { Text, StyleSheet } from 'react-native';

import { useContext, useState } from 'react';
import { DeviceContext } from '../../context/DeviceContext';


interface DomoticDeviceType {
    character: string;
    label: string;
}

const DomoticDevice = ({ character, label }: DomoticDeviceType) => {
    const context = useContext(DeviceContext);
    if (!context) throw new Error('DeviceContext debe usarse dentro de DeviceProvider');

    const { device, setDevice } = context;

    const [state, setState] = useState<string>(character.toUpperCase());
    return (
        <TouchableOpacity style={styles.box} onPress={() => {
            device?.write(state);
            setState(state === character.toUpperCase() ? character.toLowerCase() : character.toUpperCase());
        }}
        >
            <HomeSVG width={60} height={60} />
            <Text style={styles.subTitle}>{label}</Text>
        </TouchableOpacity>
    );
}

const MyHouse = () => {
    return (
        <>
            <Text style={styles.title}>Mi casa</Text>

            <DomoticDevice character='T' label='Test Luz'/>
            <DomoticDevice character='C' label='Luz 1'/>
            <DomoticDevice character='D' label='Luz 2'/>
            <DomoticDevice character='E' label='Luz 3'/>
            <DomoticDevice character='F' label='Luz 4'/>
            <DomoticDevice character='A' label='Puerta'/>
            <DomoticDevice character='B' label='Cortina'/>
        </>
    );
};

const styles = StyleSheet.create({
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

export default MyHouse;