import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Card } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';
import DropShadow from "react-native-drop-shadow";

const SignupScreen = () => {
    const [firstname, setFirstname] = useState('');
    const [invalidFirstname, setInvalidFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [invalidLastname, setInvalidLastname] = useState('');
    const [username, setUsername] = useState('');
    const [invalidUsername, setInvalidUsername] = useState(false);
    const [password, setPassword] = useState('');
    const [invalidPassword, setInvalidPassword] = useState(false);
    const [showButton, setShowButton] = useState(false);

    const { signIn } = useContext(AuthContext);

    useEffect(() => {
        if (firstname.length < 2) {
            setInvalidFirstname(true);
        } else {
            setInvalidFirstname(false);
        };

        if (firstname.length === 0) {
            setInvalidFirstname(false);
        };

        if (lastname.length < 2) {
            setInvalidLastname(true);
        } else {
            setInvalidLastname(false);
        };

        if (lastname.length === 0) {
            setInvalidLastname(false);
        };

        if (username.length < 5) {
            setInvalidUsername(true);
        } else {
            setInvalidUsername(false);
        };

        if (username.length === 0) {
            setInvalidUsername(false);
        };

        if (password.length < 5) {
            setInvalidPassword(true);
        } else {
            setInvalidPassword(false);
        };

        if (password.length === 0) {
            setInvalidPassword(false);
        };

        if (firstname.length >= 2 && lastname.length >= 2 && username.length >= 5 && password.length >= 5) {
            setInvalidFirstname(false);
            setInvalidLastname(false);
            setInvalidUsername(false);
            setInvalidPassword(false);
            setShowButton(true);
        } else {
            setShowButton(false);
        };
    }, [firstname, lastname, username, password]);

    const signupError = () =>
        Alert.alert(
            "Sign Up Error",
            "Please enter required details",
            [
                { text: "OK" }
            ]
        );

    return (
        <ScrollView contentContainerStyle={signupStyle.container} >
            <LinearGradient
                // Background Linear Gradient
                colors={['rgba(0,0,0,0.8)', 'transparent']}
                style={signupStyle.background}
            />
            <DropShadow style={signupStyle.shadowProps} >
                <Card containerStyle={signupStyle.card}>
                    <Card.Title>Sign Up</Card.Title>
                    <Card.Divider />
                    <View>
                        <Text>First name</Text>
                        <TextInput
                            autoCapitalize='sentences'
                            autoCorrect={false}
                            clearButtonMode='always'
                            style={signupStyle.input}
                            placeholder="First Name"
                            value={firstname}
                            onChangeText={setFirstname}
                        />
                    </View>

                    <View>
                        <Text>Last name</Text>
                        <TextInput
                            autoCapitalize='sentences'
                            autoCorrect={false}
                            clearButtonMode='always'
                            style={signupStyle.input}
                            placeholder="Last Name"
                            value={lastname}
                            onChangeText={setLastname}
                            secureTextEntry
                        />
                    </View>

                    {!invalidUsername ?
                        <View>
                            <Text>Username</Text>
                            <Text>(min 5 characters)</Text>
                            <TextInput
                                autoCapitalize='none'
                                autoCorrect={false}
                                clearButtonMode='always'
                                style={signupStyle.input}
                                placeholder="Username"
                                value={username}
                                onChangeText={setUsername}
                            />
                        </View>
                        :
                        <View>
                            <Text>Username</Text>
                            <Text>(min 5 characters)</Text>
                            <TextInput
                                autoCapitalize='none'
                                autoCorrect={false}
                                clearButtonMode='always'
                                style={signupStyle.invalidInput}
                                placeholder="Username"
                                value={username}
                                onChangeText={setUsername}
                            />
                        </View>
                    }

                    {invalidPassword ?
                        <View>
                            <Text>Password</Text>
                            <TextInput
                                autoCapitalize='none'
                                autoCorrect={false}
                                clearButtonMode='always'
                                style={signupStyle.invalidInput}
                                placeholder="Password"
                                value={password}
                                onChangeText={setPassword}
                            />
                        </View>
                        :
                        <View>
                            <Text>Password</Text>
                            <TextInput
                                autoCapitalize='none'
                                autoCorrect={false}
                                clearButtonMode='always'
                                style={signupStyle.input}
                                placeholder="Password"
                                value={password}
                                onChangeText={setPassword}
                            />
                        </View>
                    }

                    {showButton ?
                        <TouchableOpacity style={signupStyle.button} onPress={() => signIn({ username, password })}><Text style={{ color: 'white' }} >Sign In</Text></TouchableOpacity>
                        :
                        <TouchableOpacity style={signupStyle.inactiveButton} onPress={signupError} ><Text style={{ color: 'white' }} >Sign In</Text></TouchableOpacity>
                    }
                </Card>
            </DropShadow>
        </ScrollView>
    );
}

const signupStyle = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: 'blue',
        height: 600,
        paddingTop: 40
    },
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: 400,
    },
    card: {
        height: 400,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 5
    },
    shadowProps: {
        shadowColor: '#171717',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.4,
        shadowRadius: 2
    },
    input: {
        height: 30,
        width: 200,
        backgroundColor: 'rgb(236, 240, 246)',
        borderStyle: 'solid',
        borderColor: 'rgb(0, 122, 204)',
        borderWidth: 1,
        borderRadius: 5,
        paddingLeft: 10,
        marginBottom: 10
    },
    invalidInput: {
        height: 30,
        width: 200,
        backgroundColor: 'rgb(236, 240, 246)',
        borderStyle: 'solid',
        borderColor: 'rgb(255, 2, 2)',
        borderWidth: 1,
        borderRadius: 5,
        paddingLeft: 10,
        marginBottom: 10
    },
    button: {
        backgroundColor: 'rgb(0, 122, 204)',
        height: 30,
        width: 124,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 35
    },
    inactiveButton: {
        backgroundColor: 'rgb(51, 51, 51)',
        height: 30,
        width: 124,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 35
    }
});

export default SignupScreen;
