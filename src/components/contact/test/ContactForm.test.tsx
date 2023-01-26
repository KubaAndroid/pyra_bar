import { fireEvent, render, screen, act } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ContactForm from '../ContactForm';
import { CreateOrderedItemsContext } from '../../../context/ShopContext';
import ClientModel from '../../../models/ClientModel';
import { createMockStore } from '../../../tests/TestWrapper';

describe('render ContactForm', () => {
    
    it('checks if Contact Form is displayed', () => {
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
        expect(email.textContent).toBe('')
        const message = screen.getByPlaceholderText('message');
        expect(message.textContent).toBe('')
        const sendBtn = screen.getByRole('button')
        expect(sendBtn.textContent).toBe('Send message')
    })

    it('checks if submitHandler works', async () => {
        const store = createMockStore()
        let clientsList: ClientModel[] = []
        
        render(
            <CreateOrderedItemsContext.Provider
                value={{
                    ...store,
                    clientsList: clientsList
                }}>
                <BrowserRouter>
                    <ContactForm />
                </BrowserRouter>
            </CreateOrderedItemsContext.Provider> 
        )

        // render(<TestWrapper children={<ContactForm />} />)

        const email = screen.getByPlaceholderText('email address');
        await act(() => fireEvent.change(email, { target: { value: 'new@doe.com' } }));
        
        const message = screen.getByPlaceholderText('message');
        await act(() => fireEvent.change(message, { target: { value: 'context test!' } }));

        const sendBtn = screen.getByRole('button')
        await act(() => fireEvent.click(sendBtn));

        setTimeout(() => {
            const loadingText = screen.getByText(/Menu/)
            expect(loadingText.textContent).toBe('Menu')
        }, 1000);
    })
    
})
