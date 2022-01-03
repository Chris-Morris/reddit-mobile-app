import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import DropShadow from "react-native-drop-shadow";
import { LinearGradient } from 'expo-linear-gradient';

const PostDetailScreen = ({ route }) => {
    const { title, image } = route.params;

    return (
        <View style={styles.container} >
            <LinearGradient
                // Background Linear Gradient
                colors={['rgba(0,0,0,0.8)', 'transparent']}
                style={styles.background}
            />
            <DropShadow style={styles.shadowProp} >
                <View style={styles.card} >
                    <Text style={styles.title} >{title}</Text>
                    {/* <Text style={styles.title} >{author}</Text> */}
                    <Image
                        style={styles.image}
                        source={{ uri: image }}
                    />
                </View>
            </DropShadow>
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
    shadowProp: {
        shadowColor: '#171717',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.4,
        shadowRadius: 2
    },
    card: {
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        width: '60%',
        height: 'auto',
        padding: 10,
        margin: 10,
        height: 400,
        borderRadius: 5
    },
    title: {
        fontSize: 18,
        textTransform: 'uppercase'
    },
    image: {
        width: 250,
        height: 250
    }
});

export default PostDetailScreen;