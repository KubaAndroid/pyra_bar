import { render, screen } from '@testing-library/react'
import { FC, useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import OrderItem from '../components/order/OrderItem'
import { OrderedItemsProvider, useOrderContext } from '../context/ShopContext'
import OrderItemModel from '../models/OrderItemModel'
import OrderPage from '../pages/OrderPage'
import Wrapper from './TestWrapper'

describe("render OrderPage", () => {

    it('checks if OrderPage with empty cart renders correctly', () => {
        render(<Wrapper children={<OrderPage />} />)
        const emptyCartText = screen.getByText(/Cart/)?.textContent
        expect(emptyCartText).toBe('Cart is empty')
    })

    it('checks if OrderPage with items in cart renders correctly', () => {
        const mockOrderItem: OrderItemModel = {
            id: 0,
            quantity: 1,
            price: 12
        }
        render(<OrderPageWrapper mockOrderItem={mockOrderItem} />)
        setTimeout(() => {
            screen.debug()
        }, 2000);
    })



    
})

interface IWrapperProps {
    mockOrderItem: OrderItemModel
}

const OrderPageWrapper: FC<IWrapperProps> = ({ mockOrderItem }) => {
    
    const { orderedItems, setOrderItems } = useOrderContext()
    
    useEffect(() => {
        const insertItemToCart = async () => {
            setOrderItems([mockOrderItem])
        }
        insertItemToCart()
    }, [])
    
    return (
        <>
            <OrderedItemsProvider>
                <BrowserRouter>
                    {/* <OrderItem item={mockOrderItem} /> */}
                    <OrderPage />
                </BrowserRouter>
            </OrderedItemsProvider>
        </>
    )
}