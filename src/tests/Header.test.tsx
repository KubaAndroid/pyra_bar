import React from "react"
import { render, screen } from '@testing-library/react'

import Header from '../components/header/Header'
import GlobalStyle from "../GlobalStyle"
import { BrowserRouter } from "react-router-dom"
import { OrderedItemsProvider } from "../context/ShopContext"
import TestWrapper from "./TestWrapper"



describe("render Header component", () => {

    it('checks if badge shows the correct number of items in cart', () => {
        const numberOfItemsInCart = 234
        render(<TestWrapper children={<Header orderQuantity={numberOfItemsInCart} />} />)
        const badge = screen.getByTestId('badge');
        expect(badge.textContent).toBe(`${numberOfItemsInCart}`);
    })

    it('checks if all navigation links are rendered', () => {
        render(<TestWrapper children={<Header orderQuantity={4} />} />)
        const navLinks = screen.getAllByRole('listitem');
        expect(navLinks.length).toBe(3);
    })
})
