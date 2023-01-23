import { render, screen } from '@testing-library/react'
import { FC, useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import OrderItem from '../components/order/OrderItem'
import { OrderedItemsProvider, useOrderContext } from '../context/ShopContext'
import { CreateMockContext } from '../context/ShopContextMock'
import OrderItemModel from '../models/OrderItemModel'
import OrderPage from '../pages/OrderPage'
import Wrapper, { MockWrapper } from './TestWrapper'
import { createContext, ReactNode, useCallback, useContext, useState } from 'react'

describe("render OrderPage", () => {

    const {orderedItems, setOrderItems} = useContext(CreateMockContext)

    it('checks if OrderPage with empty cart renders correctly', () => {
        render(<Wrapper children={<OrderPage />} />)
        const emptyCartText = screen.getByText(/Cart/)?.textContent
        expect(emptyCartText).toBe('Cart is empty')
    })

    
})
