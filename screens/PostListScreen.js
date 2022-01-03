import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, ActivityIndicator, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DropShadow from "react-native-drop-shadow";
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';

const PostListScreen = () => {
    const [posts, setPosts] = useState([]);
    const [search, setSearch] = useState('new');
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

    const renderItem = ({ item }) => {
        if (item.data.thumbnail.includes('https')) {
            return (
                <DropShadow key={item.data.id} style={styles.shadowProp} >
                    <TouchableOpacity style={styles.card} onPress={() => nav.navigate('PostDetail', { title: item.data.title, image: item.data.thumbnail })} >
                        <Text style={styles.title} >Title: {item.data.title}</Text>
                        <Text style={styles.title} >Subreddit: {item.data.subreddit}</Text>
                        <Text style={styles.title} >Author: {item.data.author}</Text>
                        <Text style={styles.title} >id: {item.data.id}</Text>
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
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                        ItemSeparatorComponent={renderSeparator}
                        contentContainerStyle={{alignItems: 'center', marginTop: 20}}
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
        width: '90%',
        height: 'auto',
        padding: 10,
        margin: 10,
        borderRadius: 5
    },
    title: {
        textTransform: 'uppercase'
    },
    image: {
        height: 200,
        width: 200
    }
});

export default PostListScreen;