import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react-native';
import { Alert } from 'react-native';

import SignupScreen from '../SignupScreen';

describe('Sign In Screen', () => {

    let screen;

    beforeEach(() => {
        screen = render(<SignupScreen />);
    });

    afterEach(cleanup);

    test('renders username input', () => {
        // Arrange
        const usernameInput = screen.getByPlaceholderText('Username');

        // Assert
        expect(usernameInput).toBeDefined();
    });

    test('renders password input', () => {
        // Arrange
        const passwordInput = screen.getByPlaceholderText('Password');

        // Assert
        expect(passwordInput).toBeDefined();
    });

    test("renders username input box with invalid style when less than 5 characters entered", () => {
        // Arrange
        const username = screen.getByPlaceholderText('Username');
        fireEvent.changeText(username, 'chri')

        // Assert
        expect(username.props.style.borderColor).toBe('rgb(255, 2, 2)');
    });

    test("renders password input box with invalid style when less than 5 characters entered", () => {
        // Arrange
        const password = screen.getByPlaceholderText('Password');
        fireEvent.changeText(password, 'pass');

        // Assert
        expect(password.props.style.borderColor).toBe('rgb(255, 2, 2)');
    });

    test("renders disabled button until inputs verified, doesn't render enabled button", () => {
        // Arrange
        const disabledSubmitButton = screen.getByTestId('disabledButton');
        const enabledSubmitButton = screen.queryByTestId('enabledButton');

        // Assert
        expect(disabledSubmitButton).toBeTruthy();
        expect(enabledSubmitButton).toBeFalsy();
    });

    test("renders enabled button until inputs verified, doesn't render disabled button", () => {
        // Arrange and Act
        const username = screen.getByPlaceholderText('Username');
        const password = screen.getByPlaceholderText('Password');
        fireEvent.changeText(username, 'chris')
        fireEvent.changeText(password, 'password');
        const disabledSubmitButton = screen.queryByTestId('disabledButton');
        const enabledSubmitButton = screen.queryByTestId('enabledButton');

        // Assert
        expect(disabledSubmitButton).toBeFalsy();
        expect(enabledSubmitButton).toBeTruthy();
    });

    test('shows alert when sign in button is pressed when invalid details are present', () => {
        // Arrange
        const disabledButton = screen.getByTestId('disabledButton');
        jest.spyOn(Alert, 'alert');

        // Act
        fireEvent.press(disabledButton);

        // Assert
        expect(Alert.alert).toHaveBeenCalledTimes(1);
    });
});