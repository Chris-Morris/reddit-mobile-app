import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Tab, Text, TabView } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';

const HomeScreen = () => {
    const [index, setIndex] = useState(0);

    return (
        <View style={styles.container}>
            <LinearGradient
                // Background Linear Gradient
                colors={['rgba(0,0,0,0.8)', 'transparent']}
                style={styles.background}
            />
            <Text>Welcome to Reddit Search!</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'blue',
        paddingTop: 30,
        paddingHorizontal: 15
    },
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: 300,
    },
});

export default HomeScreen;