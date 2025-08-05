import HomeSVG from './../HouseSVG/HouseSVG';
import { TouchableOpacity } from 'react-native';
import { Alert, Text, StyleSheet } from 'react-native';
const MyHouse = () => {
    return (
        <>
            <Text style={styles.title}>Mi casa</Text>
            {[...Array(8)].map((_, i) => (
                // <BlurView key={i} blurAmount={80} blurType="light" style={styles.box}>
                <TouchableOpacity key={i}style={styles.box} onPress={() => {Alert.alert("Título", "Mensaje");}}>
                    <HomeSVG width={60} height={60} />
                    <Text style={styles.subTitle}>Dormitorio</Text>
                </TouchableOpacity>
            ))}
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