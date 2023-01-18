import React, { FC } from "react"
import { render, screen } from '@testing-library/react'
import Wrapper from "./TestWrapper"
import OrderForm from "../components/order/OrderForm"
import OrderPage from "../pages/OrderPage"
import { OrderedItemsProvider } from "../context/ShopContext"
import { BrowserRouter } from "react-router-dom"

const OrderPageWrapper = () => {
    return (
        <>
            <OrderedItemsProvider>
                <BrowserRouter>
                    <OrderForm />
                </BrowserRouter>
            </OrderedItemsProvider>
        </>
    )
}

describe("render OrderForm component", () => {
    it('checks if OrderForm renders correctly', () => {
        // <Wrapper
        //     children={
        //         <OrderForm />
        //     }
        // />

        <OrderPageWrapper />
    })
    screen.debug()
    screen.getByRole('button')
})