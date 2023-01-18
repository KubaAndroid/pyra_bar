import { render, screen } from '@testing-library/react'
import OrderPage from '../pages/OrderPage'
import Wrapper from './TestWrapper'

describe("render OrderPage component", () => {
    it('checks if OrderPage with empty cart renders correctly', () => {
        <Wrapper
            children={
                <OrderPage />
            }
        />
    })
    screen.debug()
    // const emptyCartText = screen.getByText(/Cart/)?.textContent
    // expect(emptyCartText).toBe('Cart is empty')
})