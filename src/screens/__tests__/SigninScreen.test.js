import React, { createContext } from 'react';
import { render, cleanup, debug, fireEvent } from '@testing-library/react-native';

import SigninScreen from '../SigninScreen';
import authContext from '../../../context/authContext';

const AuthContext = createContext();

describe('Sign In Screen', () => {
    afterEach(cleanup);
    test('username autoCapitalize is set to none', () => {
        const screen = render(<SigninScreen />);
        const usernameInput = screen.getByPlaceholderText('Username');
        expect(usernameInput.props.autoCapitalize).toBe('none');
    });

    test('renders password input', () => {
        const screen = render(<SigninScreen />);
        const passwordInput = screen.getByPlaceholderText('Password');
        expect(passwordInput).toBeDefined();
    });

    test("renders disabled button until inputs verified, doesn't render enabled button", () => {
        const screen = render(<SigninScreen />);
        const disabledSubmitButton = screen.getByTestId('disabledButton');
        expect(disabledSubmitButton).toBeTruthy();

        const enabledSubmitButton = screen.queryByTestId('enabledButton');
        expect(enabledSubmitButton).toBeFalsy();
    });

    test("renders enabled button until inputs verified, doesn't render disabled button", () => {
        const screen = render(<SigninScreen />);
        const username = screen.getByPlaceholderText('Username');
        fireEvent.changeText(username, 'chris')
        const password = screen.getByPlaceholderText('Password');
        fireEvent.changeText(password, 'password');
        const disabledSubmitButton = screen.queryByTestId('disabledButton');
        expect(disabledSubmitButton).toBeFalsy();

        const enabledSubmitButton = screen.queryByTestId('enabledButton');
        expect(enabledSubmitButton).toBeTruthy();
    });
});