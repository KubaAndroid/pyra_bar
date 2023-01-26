import React, { FC } from "react"
import { fireEvent, render, screen } from '@testing-library/react'
import GlobalStyle from "../../../GlobalStyle"
import { BrowserRouter } from "react-router-dom"
import { CreateOrderedItemsContext, OrderedItemsProvider, useOrderContext } from "../../../context/ShopContext"
import OrderItem from "../OrderItem"
import OrderItemModel from "../../../models/OrderItemModel"
import { createMockStore } from "../../../tests/TestWrapper"
import { act } from "react-dom/test-utils"

const mockOrderItem: OrderItemModel = {
    id: 0,
    quantity: 1,
    price: 12
}

const renderOrderItem = () => {
    const store = createMockStore()
    render(
        <CreateOrderedItemsContext.Provider
            value={{
                ...store
            }}>
            <BrowserRouter>
                <OrderItem item={mockOrderItem} />
            </BrowserRouter>
        </CreateOrderedItemsContext.Provider> 
    )
}

describe("render OrderItem component", () => {
    it('checks if the price of an item is rendered correctly', () => {
        renderOrderItem()
        const priceP = screen.getByText(/Price/).textContent?.split(/:/)[1];
        expect(priceP).toBe(` ${mockOrderItem.price.toFixed(2)}`);
    })

    it('checks if the quantity of an item is rendered correctly', () => {
        renderOrderItem()
        const quantity = screen.getByText(/Quantity/).textContent?.split(/:/)[1];
        expect(quantity).toBe(` ${mockOrderItem.quantity}`);
    })

    it('tests the INCREASE button', async () => {
        const store = createMockStore()
        const increaseOrderItemQuantity = jest.fn()
        render(
            <CreateOrderedItemsContext.Provider
                value={{
                    ...store,
                    increaseOrderItemQuantity: increaseOrderItemQuantity
                }}>
                <BrowserRouter>
                    <OrderItem item={mockOrderItem} />
                </BrowserRouter>
            </CreateOrderedItemsContext.Provider>
        )
        const increaseButton = await screen.findByText('+')
        act(() => fireEvent.click(increaseButton))

        expect(increaseOrderItemQuantity).toBeCalled()
    });

    it('tests the DECREASE button', async () => {
        const store = createMockStore()
        const reduceOrderItemQuantity = jest.fn()
        render(
            <CreateOrderedItemsContext.Provider
                value={{
                    ...store,
                    reduceOrderItemQuantity: reduceOrderItemQuantity,
                }}>
                <BrowserRouter>
                    <OrderItem item={mockOrderItem} />
                </BrowserRouter>
            </CreateOrderedItemsContext.Provider>
        )
        const decreaseButton = await screen.findByText('-')
        act(() => fireEvent.click(decreaseButton))

        expect(reduceOrderItemQuantity).toBeCalled()
    });

    it('tests the TRASH button', async () => {
        const store = createMockStore()
        const removeOrderItem = jest.fn()
        render(
            <CreateOrderedItemsContext.Provider
                value={{
                    ...store,
                    removeOrderItem: removeOrderItem
                }}>
                <BrowserRouter>
                    <OrderItem item={mockOrderItem} />
                </BrowserRouter>
            </CreateOrderedItemsContext.Provider>
        )
        const trashButton = screen.getByAltText('trash')
        act(() => fireEvent.click(trashButton))
        expect(removeOrderItem).toBeCalled()
    });


})