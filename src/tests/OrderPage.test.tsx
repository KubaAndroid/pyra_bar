import { render, screen } from '@testing-library/react'
import OrderPage from '../pages/OrderPage'
import Wrapper from './TestWrapper'

describe("render OrderPage component", () => {
    it('checks if OrderPage with empty cart renders correctly', () => {
        render(<Wrapper children={<OrderPage />} />)
        
        // screen.debug()
        const emptyCartText = screen.getByText(/Cart/)?.textContent
        expect(emptyCartText).toBe('Cart is empty')
    })

    it('checks if OrderPage with items in cart renders correctly', () => {
        render(<Wrapper children={<OrderPage />} />)
        
        // screen.debug()
        const emptyCartText = screen.getByText(/Cart/)?.textContent
        expect(emptyCartText).toBe('Cart is empty')
    })
    
})