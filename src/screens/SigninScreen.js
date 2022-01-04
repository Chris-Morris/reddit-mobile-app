import React, { useState, useContext, useEffect, createContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

import authContext from '../../context/authContext';
const AuthContext = createContext(authContext);

const SigninScreen = () => {
    const [username, setUsername] = useState('');
    const [invalidUsername, setInvalidUsername] = useState(false);
    const [password, setPassword] = useState('');
    const [invalidPassword, setInvalidPassword] = useState(false);
    const [showButton, setShowButton] = useState(false);

    const { signIn } = useContext(AuthContext);

    useEffect(() => {
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

        if (username.length >= 5 && password.length >= 5) {
            setInvalidUsername(false);
            setInvalidPassword(false);
            setShowButton(true);
        };
    }, [username, password]);

    return (
        <View style={signinStyle.container} >


            {!invalidUsername ?
                <View>
                    <Text>Please enter your username</Text>
                    <Text>(min 5 characters)</Text>
                    <TextInput
                        autoCapitalize='none'
                        autoCorrect={false}
                        clearButtonMode='always'
                        style={signinStyle.input}
                        placeholder="Username"
                        value={username}
                        onChangeText={setUsername}
                    />
                </View>
                :
                <View>
                    <Text>Please enter a valid username</Text>
                    <Text>(min 5 characters)</Text>
                    <TextInput
                        autoCapitalize='none'
                        autoCorrect={false}
                        clearButtonMode='always'
                        style={signinStyle.invalidInput}
                        placeholder="Username"
                        value={username}
                        onChangeText={setUsername}
                    />
                </View>
            }

            {invalidPassword ?
                <View>
                    <Text>Please enter a valid password</Text>
                    <TextInput
                        autoCapitalize='none'
                        autoCorrect={false}
                        clearButtonMode='always'
                        style={signinStyle.invalidInput}
                        placeholder="Password"
                        value={password}
                        onChangeText={setPassword}
                    />
                </View>
                :
                <View>
                    <Text>Please enter your password</Text>
                    <TextInput
                        autoCapitalize='none'
                        autoCorrect={false}
                        clearButtonMode='always'
                        style={signinStyle.input}
                        placeholder="Password"
                        value={password}
                        onChangeText={setPassword}
                    />
                </View>
            }
            {showButton ?
                <TouchableOpacity style={signinStyle.button} onPress={() => signIn({ username, password })}><Text style={{ color: 'white' }} >Sign In</Text></TouchableOpacity>
                :
                <TouchableOpacity style={signinStyle.inactiveButton} ><Text style={{ color: 'white' }} >Sign In</Text></TouchableOpacity>
            }
        </View >
    );
}

const signinStyle = StyleSheet.create({
    container: {
        height: 300, marginTop: 50, justifyContent: 'space-around', alignItems: 'center'
    },
    input: {
        height: 30, width: 200, backgroundColor: 'rgb(236, 240, 246)', borderStyle: 'solid', borderColor: 'rgb(0, 122, 204)', borderWidth: 1, borderRadius: 5, paddingLeft: 10
    },
    invalidInput: {
        height: 30, width: 200, backgroundColor: 'rgb(236, 240, 246)', borderStyle: 'solid', borderColor: 'rgb(255, 2, 2)', borderWidth: 1, borderRadius: 5, paddingLeft: 10
    },
    button: {
        backgroundColor: 'rgb(0, 122, 204)', height: 30, width: 124, borderRadius: 5, justifyContent: 'center', alignItems: 'center'
    },
    inactiveButton: {
        backgroundColor: 'rgb(51, 51, 51)', height: 30, width: 124, borderRadius: 5, justifyContent: 'center', alignItems: 'center'
    }
});

export default SigninScreen
