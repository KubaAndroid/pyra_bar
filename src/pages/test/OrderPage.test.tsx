import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import OrderItem from '../../components/order/OrderItem'
import { CreateOrderedItemsContext } from '../../context/ShopContext'
import OrderItemModel from '../../models/OrderItemModel'
import { createMockStore } from '../../tests/TestWrapper'
import OrderPage from '../OrderPage'

interface IOrderItemModel {
    orderedItem: OrderItemModel
}

const renderOrderItem = ({orderedItem}: IOrderItemModel) => {
    const store = createMockStore();
    render(
        <CreateOrderedItemsContext.Provider
            value={{
                ...store
            }}>
            <BrowserRouter>
                <OrderItem item={orderedItem} />
            </BrowserRouter>
        </CreateOrderedItemsContext.Provider> 
    )
}

const renderOrderPage = () => {
    const store = createMockStore();
    render(
        <CreateOrderedItemsContext.Provider
            value={{
                ...store
            }}>
            <BrowserRouter>
                <OrderPage orderedItems={[mockOrderItem]} />
            </BrowserRouter>
        </CreateOrderedItemsContext.Provider> 
    )
}

const mockOrderItem: OrderItemModel = {
    id: 0,
    quantity: 1,
    price: 48
}

describe("render OrderPage", () => {

    it('checks if OrderPage with empty cart renders correctly', () => {

        const store = createMockStore();
        render(
            <CreateOrderedItemsContext.Provider
                value={{
                    ...store
                }}>
                <BrowserRouter>
                    <OrderPage orderedItems={[]} />
                </BrowserRouter>
            </CreateOrderedItemsContext.Provider> 
        )

        const emptyCartText = screen.getByText(/Cart/)?.textContent;
        expect(emptyCartText).toBe('Cart is empty');
    })

    it('checks if OrderPage shows price of ordered item correctly', () => {
        renderOrderPage();

        const sumTotalText = screen.getByText(/Sum total/)?.textContent
        expect(sumTotalText).toBe('Sum total: 48.00')
    })

    it('checks if OrderPage shows Confirm button', () => {
        renderOrderPage();

        const confirmButton = screen.getByText('Confirm');
        expect(confirmButton).toBeInTheDocument();
    })


})
