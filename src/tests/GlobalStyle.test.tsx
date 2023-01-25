import { fireEvent, render, screen, waitForElementToBeRemoved } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { CreateOrderedItemsContext } from '../context/ShopContext'
import ContactPage from '../pages/ContactPage'

import { createMockStore } from "./TestWrapper"

const renderMenuPage = () => {
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
}

describe('check if page renders', () => {
    it('check styles', () => {
        renderMenuPage();
        const contactText = screen.getByLabelText('Your email address:');
        expect(contactText).toBeInTheDocument();
    })
})
