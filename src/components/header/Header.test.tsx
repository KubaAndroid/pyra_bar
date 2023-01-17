import React from "react"
import { render, screen } from '@testing-library/react'

import Header from './Header'
import GlobalStyle from "../../GlobalStyle"
import { BrowserRouter } from "react-router-dom"
import { OrderedItemsProvider } from "../../context/ShopContext"

describe("render Header component", () => {

    it('checks if badhe shows the correct number of items in cart', () => {
        const numberOfItemsInCart = 234
        render(
            <>
                <GlobalStyle />
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
                <GlobalStyle />
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
