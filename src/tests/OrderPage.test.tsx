import { render, screen } from '@testing-library/react'
import { FC, useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import OrderItem from '../components/order/OrderItem'
import { OrderedItemsProvider, useOrderContext } from '../context/ShopContext'
import { CreateMockContext } from './ShopContextMock'
import OrderItemModel from '../models/OrderItemModel'
import OrderPage from '../pages/OrderPage'
import Wrapper, { MockWrapper } from './TestWrapper'
import { createContext, ReactNode, useCallback, useContext, useState } from 'react'

describe("render OrderPage", () => {

    // const {orderedItems, setOrderItems} = useContext(CreateMockContext)

    it('checks if OrderPage with empty cart renders correctly', () => {

        render(<MockWrapper children={<OrderPage orderedItems={[]}/>} />)
        const emptyCartText = screen.getByText(/Cart/)?.textContent
        expect(emptyCartText).toBe('Cart is empty')
    })

    it('checks if OrderPage shows price of ordered item correctly', () => {
        const mockOrderItem: OrderItemModel = {
            id: 0,
            quantity: 1,
            price: 48
        }

        render(<MockWrapper children={<OrderPage orderedItems={[mockOrderItem]}/>} />)
        const sumTotalText = screen.getByText(/Sum total/)?.textContent
        expect(sumTotalText).toBe('Sum total: 48.00')
    })

    it('checks if OrderPage shows Confirm button', () => {
        const mockOrderItem: OrderItemModel = {
            id: 0,
            quantity: 2,
            price: 455
        }

        render(<MockWrapper children={<OrderPage orderedItems={[mockOrderItem]}/>} />)
        const confirmButton = screen.getByText('Confirm')
        expect(confirmButton).toBeInTheDocument()
    })


})
