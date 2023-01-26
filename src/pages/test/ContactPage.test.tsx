import { fireEvent, render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { CreateOrderedItemsContext } from '../../context/ShopContext';
import ContactPage from '../ContactPage';
import { createMockStore } from '../../tests/TestWrapper';

describe('render ContactPage', () => {

    it('checks if Contact screen is displayed', () => {
        // render(<TestWrapper children={<ContactPage />} />)
        const store = createMockStore()
        render(
            <CreateOrderedItemsContext.Provider
                value={{
                    ...store
                }}>
                <BrowserRouter>
                    <ContactPage />
                </BrowserRouter>
            </CreateOrderedItemsContext.Provider> 
        )

        const sendBtn = screen.getByRole('button');
        expect(sendBtn.textContent).toBe('Send message')
    })
})