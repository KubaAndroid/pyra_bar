import { render, screen } from '@testing-library/react';
import ContactForm from '../components/contact/ContactForm';
import TestWrapper from './TestWrapper';

describe('render ContactForm', () => {

    it('checks if Contact Form is displayed', () => {
        render(<TestWrapper children={<ContactForm />} />)
        const fname = screen.getByPlaceholderText('email address');
        expect(fname.textContent).toBe('')
        const message = screen.getByPlaceholderText('message');
        expect(message.textContent).toBe('')
        const sendBtn = screen.getByRole('button')
        expect(sendBtn.textContent).toBe('Send message')
    })

    
})