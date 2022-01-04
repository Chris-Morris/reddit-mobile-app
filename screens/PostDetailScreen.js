import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { Card } from 'react-native-elements';
import DropShadow from "react-native-drop-shadow";
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const PostDetailScreen = ({ route }) => {
    const { title, image, author, subreddit, ups, downs, comments } = route.params;

    return (
        <View style={styles.container} >
            <LinearGradient
                // Background Linear Gradient
                colors={['rgba(0,0,0,0.8)', 'transparent']}
                style={styles.background}
            />
            <DropShadow style={styles.shadowProp} >
                <ScrollView contentContainerStyle={styles.card} >
                    <Text style={styles.title} >Title: {title}</Text>
                    <Card.Divider style={styles.divider} />
                    <Text style={styles.title} >Subreddit: {subreddit}</Text>
                    <Card.Divider style={styles.divider} />
                    <Text style={styles.title} >Author: {author}</Text>
                    <Card.Divider style={styles.divider} />
                    <Image
                        style={styles.image}
                        source={{ uri: image }}
                    />
                    <View style={styles.stats} >
                    <Ionicons name="thumbs-up" color={styles.iconColor} size={styles.iconSize} ><Text> {ups}</Text></Ionicons>
                    <Ionicons name="thumbs-down" color={styles.iconColor} size={styles.iconSize} ><Text> {downs}</Text></Ionicons>
                    <Ionicons name="chatbubbles" color={styles.iconColor} size={styles.iconSize} ><Text> {comments}</Text></Ionicons>
                    </View>
                </ScrollView>
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
        height: 600,
    },
    shadowProp: {
        shadowColor: '#171717',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.4,
        shadowRadius: 2
    },
    card: {
        backgroundColor: 'white',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '95%',
        height: 'auto',
        padding: 10,
        margin: 10,
        marginTop: 30,
        height: 500,
        borderRadius: 5
    },
    title: {
        // fontSize: 18,
        // textTransform: 'uppercase'
    },
    divider: {
        height: 1,
        width: 200,
        marginTop: 5
    },
    image: {
        width: 250,
        height: 250,
        borderRadius: 5
    },
    stats: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    iconColor: {
        color: 'rgb(55, 55, 55)'
    },
    iconSize: {
        fontSize: 20
    }
});

export default PostDetailScreen;