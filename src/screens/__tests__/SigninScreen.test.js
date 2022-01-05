import React, { createContext } from 'react';
import { render, cleanup, debug } from '@testing-library/react-native';

import SigninScreen from '../SigninScreen';
import authContext from '../../../context/authContext';

const AuthContext = createContext();

describe('Sign In Screen', () => {
    afterEach(cleanup);
    test('username autoCapitalize is set to none', () => {
        const screen = render(<SigninScreen />);
        screen.debug();
        const usernameInput = screen.getByPlaceholderText('Username');
        expect(usernameInput.props.autoCapitalize).toBe('none');
    });

    // test('renders password input', () => {
    //     const screen = render(<SigninScreen />);
    //     const passwordInput = screen.getByPlaceholderText('Password');
    //     expect(passwordInput).toBeInTheDocument;
    // });
});