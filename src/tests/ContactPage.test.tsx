import { fireEvent, render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import ContactPage from '../pages/ContactPage';
import TestWrapper from './TestWrapper';

describe('render ContactPage', () => {

    it('checks if Contact screen is displayed ', () => {
        render(<TestWrapper children={<ContactPage />} />)
        const sendBtn = screen.getByRole('button');
        expect(sendBtn.textContent).toBe('Send message')
        // screen.debug()
    })
})