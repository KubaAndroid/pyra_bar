import React from "react"
import { render, screen } from '@testing-library/react'

import Header from './Header'
import GlobalStyle from "../../GlobalStyle"
import { BrowserRouter } from "react-router-dom"
import { OrderedItemsProvider } from "../../context/ShopContext"

test("render component", () => {
    render(
        <>
            {/* <GlobalStyle /> */}
            <OrderedItemsProvider>
                <BrowserRouter>
                    <Header orderQuantity={3} />
                </BrowserRouter>
            </OrderedItemsProvider>
        </>
    )
    const badge = screen.getByTestId('badge');
    expect(badge.textContent).toBe("3")
    expect(screen.getByText("Bar Pyra")).toBeInTheDocument()
})