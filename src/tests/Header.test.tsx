import React from "react"
import { render, screen } from '@testing-library/react'

import Header from '../components/header/Header'
import GlobalStyle from "../GlobalStyle"
import { BrowserRouter } from "react-router-dom"
import { OrderedItemsProvider } from "../context/ShopContext"



describe("render Header component", () => {

    it('checks if badge shows the correct number of items in cart', () => {
        const numberOfItemsInCart = 234
        render(
            <>
                <OrderedItemsProvider>
                    <BrowserRouter>
                        <Header orderQuantity={numberOfItemsInCart} />
                    </BrowserRouter>
                </OrderedItemsProvider>
            </>
        )
        const badge = screen.getByTestId('badge');
        expect(badge.textContent).toBe(`${numberOfItemsInCart}`);
    })

    it('checks if all navigation links are rendered', () => {
        render(
            <>
                <OrderedItemsProvider>
                    <BrowserRouter>
                        <Header orderQuantity={3} />
                    </BrowserRouter>
                </OrderedItemsProvider>
            </>
        )
        const navLinks = screen.getAllByRole('listitem');
        expect(navLinks.length).toBe(3);
    })
})
