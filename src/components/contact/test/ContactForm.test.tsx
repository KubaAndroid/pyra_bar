import { fireEvent, render, screen, act, waitFor } from '@testing-library/react';
import { BrowserRouter, MemoryRouter, Route, Routes } from 'react-router-dom';
import ContactForm from '../ContactForm';
import { CreateOrderedItemsContext } from '../../../context/ShopContext';
import { createMockStore } from '../../../tests/TestWrapper';
import { createMemoryRouter } from 'react-router-dom';
import { PropsWithChildren } from 'react';
import MenuPage from '../../../pages/MenuPage';
import ContactPage from '../../../pages/ContactPage';
import * as router from 'react-router-dom'


describe('render ContactForm', () => {
    
    it('checks if Contact Form is displayed', () => {
        const store = createMockStore();
        render(
            <CreateOrderedItemsContext.Provider
                value={{
                    ...store
                }}>
                <BrowserRouter>
                    <ContactForm />
                </BrowserRouter>
            </CreateOrderedItemsContext.Provider> 
        )
        const email = screen.getByPlaceholderText('email address');
        expect(email.textContent).toBe('')
        const message = screen.getByPlaceholderText('message');
        expect(message.textContent).toBe('')
        const sendBtn = screen.getByRole('button')
        expect(sendBtn.textContent).toBe('Send message')
    })

    it('checks if submitHandler works', async () => {
        const store = createMockStore()
        render(
            <CreateOrderedItemsContext.Provider
                value={{
                    ...store
                }}>
                <BrowserRouter>
                    <ContactForm />
                </BrowserRouter>
            </CreateOrderedItemsContext.Provider> 
        )


        const email = screen.getByPlaceholderText('email address');
        await act(() => fireEvent.change(email, { target: { value: 'new@doe.com' } }));
        
        const message = screen.getByPlaceholderText('message');
        await act(() => fireEvent.change(message, { target: { value: 'context test!' } }));

        const sendBtn = screen.getByRole('button')
        await act(() => fireEvent.click(sendBtn));
        
    });
    
});