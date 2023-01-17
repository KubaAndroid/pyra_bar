import React from "react"
import { render, screen } from '@testing-library/react'

import GlobalStyle from "../../../GlobalStyle"
import { BrowserRouter } from "react-router-dom"
import { OrderedItemsProvider, useOrderContext } from "../../../context/ShopContext"
import OrderItem from "../OrderItem"
import { OrderItemModel } from "../../../models/OrderItemModel"

describe("render OrderItem component", () => {

    it('checks if badhe shows the correct number of items in cart', () => {
        const mockOrderItem: OrderItemModel = {
            id: 1,
            quantity: 1,
            price: 12
        }
        render(
            <>
                <GlobalStyle />
                <OrderedItemsProvider>
                    <BrowserRouter>
                        <OrderItem item={mockOrderItem}  />
                    </BrowserRouter>
                </OrderedItemsProvider>
            </>
        )
        screen.debug()
        // screen.getByTestId();
        // expect().toBe();
    })

})