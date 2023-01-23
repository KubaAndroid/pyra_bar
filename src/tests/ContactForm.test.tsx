import { fireEvent, render, screen, act } from '@testing-library/react';
import ContactForm from '../components/contact/ContactForm';
import TestWrapper from './TestWrapper';

describe('render ContactForm', () => {


    it('checks if Contact Form is displayed', () => {
        render(<TestWrapper children={<ContactForm />} />)
        const email = screen.getByPlaceholderText('email address');
        expect(email.textContent).toBe('')
        const message = screen.getByPlaceholderText('message');
        expect(message.textContent).toBe('')
        const sendBtn = screen.getByRole('button')
        expect(sendBtn.textContent).toBe('Send message')
    })

    it('checks if submitHandler works', async () => {
        render(<TestWrapper children={<ContactForm />} />)
        const email = screen.getByPlaceholderText('email address');
        await act(() => fireEvent.change(email, { target: { value: 'john@doe.com' } }));
        
        const message = screen.getByPlaceholderText('message');
        await act(() => fireEvent.change(message, { target: { value: 'a new message!' } }));

        const sendBtn = screen.getByRole('button')
        await act(() => fireEvent.click(sendBtn));

        setTimeout(() => {
            const loadingText = screen.getByText(/Loading/)
            expect(loadingText.textContent).toBe('Loading...')
             screen.debug()
        }, 1000);
    })
    
})
