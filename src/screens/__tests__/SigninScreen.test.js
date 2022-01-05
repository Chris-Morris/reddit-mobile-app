import React from 'react';
import { render, cleanup, screen } from '@testing-library/react-native';

import SigninScreen from '../SigninScreen';

describe('Sign In Screen', () => {
    afterEach(cleanup);

    // Mobile version
    test('renders username input', () => {
        // Render the Sign In screen
        const { getByPlaceholderText } = render(<SigninScreen />);

        // Extract the Username input
        const username = getByPlaceholderText('Username');

        // Assert the damn thing exists
        expect(username).toBeInTheDocument();
    });

    // Desktop version
    test('renders username input', () => {
        // Render the Sign In screen
        render(<SigninScreen />);

        // Extract the Username input
        const username = screen.getByPlaceholderText('Username');

        // Assert the damn thing exists
        expect(username).toBeInTheDocument();
    });
});