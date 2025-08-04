import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { BlurView } from 'expo-blur';
import HomeSVG from './components/SVGs/HouseSVG/HouseSVG';

export default function App() {
    return (
        <SafeAreaProvider>
            <SafeApp/>
        </SafeAreaProvider>
    );
}

const SafeApp = () => {
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
            // borderWidth: 2,
            // borderColor: 'red',
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

    const insets = useSafeAreaInsets();

    return (
        <View style={[styles.outerContainer, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
            <LinearGradient
                colors={['#0088BB', '#000000']} // rojo a azul
                start={{ x: 0, y: 0 }}  // izquierda arriba
                end={{ x: 1, y: 1 }}    // derecha abajo
                style={{ flex: 1 }}
            >
                <ScrollView contentContainerStyle={styles.container}>
                    <Text style={styles.title}>Mi casa</Text>
                    {[...Array(8)].map((_, i) => (
                        <BlurView key={i} intensity={80} tint="light" style={styles.box}>
                            <HomeSVG width={60} height={60} />
                            <Text style={styles.subTitle}>Dormitorio</Text>
                        </BlurView>
                    ))}
                </ScrollView>
            </LinearGradient>
        </View>
    );
}
