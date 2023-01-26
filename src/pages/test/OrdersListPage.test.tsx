import { fireEvent, render, screen, waitForElementToBeRemoved } from '@testing-library/react'
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { BrowserRouter } from 'react-router-dom';
import { CreateOrderedItemsContext } from '../../context/ShopContext';
import OrderModel from '../../models/OrderModel';
import { createMockStore } from '../../tests/TestWrapper';
import OrdersListPage from '../OrdersListPage';


describe('render OrdersListPage', () => {

    it('checks if Loading screen is displayed when menu items list is empty', async () => {
        const store = createMockStore()
        const ordersList: OrderModel[] = [{id: 1, quantity: 3}]
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

        // const loadingTxt = screen.getByText(/Loading/)
        // expect(loadingTxt.textContent).toBe("Loading...");
    })

    // TODO: test with mock ordered items put into context
})