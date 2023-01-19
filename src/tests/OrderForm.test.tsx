import React, { FC } from "react"
import { act, render, screen } from '@testing-library/react'
import Wrapper from "./TestWrapper"
import OrderForm from "../components/order/OrderForm"
import OrderPage from "../pages/OrderPage"
import { OrderedItemsProvider } from "../context/ShopContext"
import { BrowserRouter } from "react-router-dom"
import userEvent from "@testing-library/user-event"


describe("render OrderForm component", () => {
    it('checks if OrderForm renders correctly', () => {
        render(<Wrapper children={<OrderForm /> }/>)

        const orderBtn = screen.getByRole('button')
        act(() => {
            userEvent.click(orderBtn)
            screen.debug()
      });
        
        // TODO: click, check if <divs> are showing
    })
    
})