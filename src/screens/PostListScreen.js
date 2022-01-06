import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, ActivityIndicator, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Card } from 'react-native-elements';
import DropShadow from "react-native-drop-shadow";
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import ThumbIcon from '../components/ThumbIcon';

const PostListScreen = ({ route, navigation }) => {
    const [posts, setPosts] = useState([]);
    const [search, setSearch] = useState('javascript');
    const [loading, setLoading] = useState(false);
    const nav = useNavigation();

    const fetchPosts = async () => {
        setLoading(true);
        const response = await axios.get(`https://www.reddit.com/search.json?q=${search}&limit=20`, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        setLoading(false);
        setPosts(response.data.data.children);
    };

    const handleSearch = () => {
        fetchPosts();
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const renderItem = ({ item, index }) => {
        if (item.data.thumbnail.includes('https') && !item.data.over_18) {
            return (
                <DropShadow key={index} style={styles.shadowProp} >
                    <TouchableOpacity style={styles.card} onPressOut={() => nav.navigate('PostDetail', {
                        title: item.data.title,
                        image: item.data.thumbnail,
                        author: item.data.author,
                        subreddit: item.data.subreddit,
                        text: item.data.text,
                        ups: item.data.ups,
                        downs: item.data.downs,
                        comments: item.data.num_comments
                    })} >
                        <Text style={styles.title} >Title: {item.data.title}</Text>
                        <Card.Divider style={styles.divider} />
                        <Text style={styles.title} >Subreddit: {item.data.subreddit}</Text>
                        <Card.Divider style={styles.divider} />
                        <Text style={styles.title} >Author: {item.data.author}</Text>
                        <Card.Divider style={styles.divider} />
                        {item.data.thumbnail.includes('https')
                            ?
                            <Image
                                style={styles.image}
                                resizeMode="cover"
                                source={{ uri: item.data.thumbnail }}
                            />
                            :
                            <Text>No image available</Text>
                        }
                        <View style={styles.statsContainer} >
                            <Text><ThumbIcon ups={item.data.ups} /> {item.data.ups}</Text>
                            <Text><Icon name="comments" size={20} color="#404040" /> {item.data.num_comments}</Text>
                        </View>
                    </TouchableOpacity>
                </DropShadow>
            )
        } else {
            return <></>
        };
    };

    const renderSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: '86%',
                    backgroundColor: '#CED0CE',
                    marginLeft: '5%'
                }}
            />
        )
    };

    return (
        <View style={styles.container}>
            <LinearGradient
                // Background Linear Gradient
                colors={['rgba(0,0,0,0.8)', 'transparent']}
                style={styles.background}
            />
            {loading
                ? <ActivityIndicator animating size="large" />
                : <View>
                    <TextInput
                        autoCapitalize='none'
                        autoCorrect={false}
                        onChangeText={setSearch}
                        clearButtonMode='always'
                        returnKeyType='search'
                        onSubmitEditing={handleSearch}
                        status='info'
                        placeholder='Search'
                        style={{
                            borderRadius: 5,
                            borderColor: '#333',
                            backgroundColor: '#fff',
                            height: 30,
                            marginTop: 20,
                            paddingLeft: 10
                        }}
                        textStyle={{ color: '#000' }}
                    /><FlatList
                        data={posts}
                        keyExtractor={item => item.data.id}
                        renderItem={renderItem}
                        ItemSeparatorComponent={renderSeparator}
                        contentContainerStyle={{ alignItems: 'center', marginTop: 20 }}
                    />
                </View>
            }
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
        minWidth: '90%',
        height: 'auto',
        padding: 10,
        margin: 10,
        borderRadius: 5
    },
    title: {
        // textTransform: 'uppercase'
    },
    divider: {
        height: 1,
        width: 200,
        marginTop: 5
    },
    image: {
        height: 200,
        width: 200,
        borderRadius: 5
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center',
        width: 200,
        marginTop: 10
    }
});

export default PostListScreen;