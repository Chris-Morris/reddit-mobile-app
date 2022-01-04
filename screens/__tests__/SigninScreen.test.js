import React, { createContext } from 'react';
import { render, screen } from '@testing-library/react-native';

import SigninScreen from '../SigninScreen';
import authContext from '../../context/authContext';

const AuthContext = createContext();

describe('Sign In Screen', () => {
    test('renders username input', () => {
        render(
            <AuthContext.Provider value={authContext}>
                <SigninScreen />
            </AuthContext.Provider>
        );
        const usernameInput = screen.getByPlaceHolder('Username');
        expect(usernameInput).toBeInTheDocument();
    });
});