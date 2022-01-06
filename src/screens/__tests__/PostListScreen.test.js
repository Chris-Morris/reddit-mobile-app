import React, { createContext } from 'react';
import { render, cleanup, debug, fireEvent } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import PostListScreen from '../PostListScreen';
import authContext from '../../../context/authContext';
const AuthContext = createContext(authContext);

const PostsStack = createNativeStackNavigator();

function PostsScreen() {
    return (
        <NavigationContainer>
            <PostsStack.Navigator>
                <PostsStack.Screen name="PostList" component={PostListScreen} options={{ headerShown: false }} />
            </PostsStack.Navigator>
        </NavigationContainer>
    );
}

describe('Post List Screen', () => {
    test("renders something", () => {
        const screen = render(
            <AuthContext.Provider value={authContext}>
                {PostsScreen()}
            </AuthContext.Provider>
        );
        screen.debug();
    });
});

// "jest": "^27.4.5",