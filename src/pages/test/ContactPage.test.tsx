import { fireEvent, render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { CreateOrderedItemsContext } from '../../context/ShopContext';
import ContactPage from '../ContactPage';
import { createMockStore } from '../../tests/TestWrapper';
import { act } from 'react-dom/test-utils';

const renderContactPage = () => {
    act(() => {
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
    });
}

describe('render ContactPage', () => {

    it('checks if Contact screen is displayed', () => {
        renderContactPage();
        const sendBtn = screen.getByRole('button');
        expect(sendBtn.textContent).toBe('Send message');
    })
})