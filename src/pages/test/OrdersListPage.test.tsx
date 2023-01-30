import { BrowserRouter } from 'react-router-dom';
import { CreateOrderedItemsContext } from '../../context/ShopContext';
import OrderModel from '../../models/OrderModel';
import { createMockStore } from '../../tests/TestWrapper';
import OrdersListPage from '../OrdersListPage';
import { render, screen } from '@testing-library/react'


describe('render OrdersListPage', () => {

    it('checks if Loading screen is displayed when menu items list is empty', async () => {
        const store = createMockStore();
        const ordersList: OrderModel[] = [{id: 1, quantity: 3}];
        render(
            <CreateOrderedItemsContext.Provider
                value={{
                    ...store,
                    ordersList: ordersList
                }}>
                <BrowserRouter>
                    <OrdersListPage />
                </BrowserRouter>
            </CreateOrderedItemsContext.Provider> 
        )

        const orderText = screen.getByText(/Order/);
        expect(orderText.textContent).toBe('Order 1')

    })

})