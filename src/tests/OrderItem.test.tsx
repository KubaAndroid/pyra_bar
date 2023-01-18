import React, { FC } from "react"
import { render, screen } from '@testing-library/react'
import GlobalStyle from "../GlobalStyle"
import { BrowserRouter } from "react-router-dom"
import { OrderedItemsProvider, useOrderContext } from "../context/ShopContext"
import OrderItem from "../components/order/OrderItem"
import OrderItemModel from "../models/OrderItemModel"

interface IWrapperProps {
    mockOrderItem: OrderItemModel
}

const OrderWrapper: FC<IWrapperProps> = ({ mockOrderItem }) => {
    const {
        getAllMenuItems,
        orderedItems,
        getAllOrders
    } = useOrderContext()
    
    return (
        <>
            <OrderedItemsProvider>
                <BrowserRouter>
                    <OrderItem item={mockOrderItem} />
                </BrowserRouter>
            </OrderedItemsProvider>
        </>
    )
}

describe("render OrderItem component", () => {
    it('checks if the price of an item is rendered correctly', () => {
        const mockOrderItem: OrderItemModel = {
            id: 0,
            quantity: 1,
            price: 12
        }

        render (<OrderWrapper mockOrderItem={mockOrderItem} />)
        const priceP = screen.getByText(/Price/).textContent?.split(/:/)[1];
        expect(priceP).toBe(` ${mockOrderItem.price.toFixed(2)}`);
    })

    it('checks if the quantity of an item is rendered correctly', () => {
        const mockOrderItem: OrderItemModel = {
            id: 0,
            quantity: 4,
            price: 48
        }
        render (<OrderWrapper mockOrderItem={mockOrderItem} />)
        const quantity = screen.getByText(/Quantity/).textContent?.split(/:/)[1];
        expect(quantity).toBe(` ${mockOrderItem.quantity}`);
    })

})