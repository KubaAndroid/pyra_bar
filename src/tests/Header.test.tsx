import React from "react"
import { render, screen } from '@testing-library/react'
import Header from '../components/header/Header'
import { BrowserRouter } from "react-router-dom"
import { CreateOrderedItemsContext } from "../context/ShopContext"
import { createMockStore } from "./TestWrapper"



describe("render Header component", () => {

    it('checks if badge shows the correct number of items in cart', () => {
        const numberOfItemsInCart = 234
        const store = createMockStore()
        render(
            <CreateOrderedItemsContext.Provider
                value={{
                    ...store
                }}>
                <BrowserRouter>
                    <Header orderQuantity={numberOfItemsInCart} />
                </BrowserRouter>
            </CreateOrderedItemsContext.Provider> 
        )
        // render(<TestWrapper children={<Header orderQuantity={numberOfItemsInCart} />} />)

        const badge = screen.getByTestId('badge');
        expect(badge.textContent).toBe(`${numberOfItemsInCart}`);
    })

    it('checks if all navigation links are rendered', () => {
        const store = createMockStore()
        render(
            <CreateOrderedItemsContext.Provider
                value={{
                    ...store
                }}>
                <BrowserRouter>
                    <Header orderQuantity={6} />
                </BrowserRouter>
            </CreateOrderedItemsContext.Provider> 
        )

        const navLinks = screen.getAllByRole('listitem');
        expect(navLinks.length).toBe(3);
    })
})
