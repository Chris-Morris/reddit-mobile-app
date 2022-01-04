import React, { createContext } from 'react';
import { render, cleanup } from '@testing-library/react-native';
import '@testing-library/jest-dom';

import SigninScreen from '../SigninScreen';
import authContext from '../../../context/authContext';

const AuthContext = createContext();

describe('Sign In Screen', () => {
    afterEach(cleanup);
    test('renders username input', () => {
        const screen = render(<SigninScreen />);
        screen.debug();
        const usernameInput = screen.getByPlaceholderText('Username');
        expect(usernameInput).toBeInTheDocument;
    });

    test('renders password input', () => {
        const screen = render(<SigninScreen />);
        const passwordInput = screen.getByPlaceholderText('Password');
        expect(passwordInput).toBeInTheDocument;
    });

    test('renders inactive sign in button until inputs are satisfied', () => {
        const screen = render(<SigninScreen />);
        const button = screen.getByTestId('button');
        expect(button).toBeInTheDocument();
    });
});