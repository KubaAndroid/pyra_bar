import { fireEvent, render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom';
import OrdersListItem from '../OrdersListItem';
import { CreateOrderedItemsContext } from '../../../context/ShopContext';
import UserOrdersModel from '../../../models/UserOrdersModel';
import { createMockStore } from '../../../tests/TestWrapper';
import { act } from 'react-dom/test-utils';

const mockUserOrder: UserOrdersModel = {
    userId: 3210894,
    date: "Mon, 09 Jan 2023 13:46:44",
    menuItems: [
        0,
        0,
        1,
        3,
        3
      ],
      id: 39
}

describe('render OrderList Item', () => {

    it('checks if ORDER ID is displayed correctly', () => {
        const store = createMockStore()
        const setIsExtended = jest.fn()
        render(
            <CreateOrderedItemsContext.Provider
                value={{
                    ...store,
                    setIsExtended: setIsExtended
                }}>
                <BrowserRouter>
                    <OrdersListItem order={mockUserOrder} />
                </BrowserRouter>
            </CreateOrderedItemsContext.Provider> 
        );
        
        const orderNumber = screen.getByText(/Order/).textContent?.split(' ')[1];
        expect(orderNumber).toBe(`${mockUserOrder.id}`);

        const firstDiv = screen.getAllByRole('columnheader')[0];
        const fitstDivBeforeClick = firstDiv.textContent
        act(() => fireEvent.click(firstDiv))

        const firstDivAfter = screen.getAllByRole('columnheader')[0];
        const fitstDivAfterClick = firstDivAfter.textContent
        
        expect(fitstDivBeforeClick).not.toBe(fitstDivAfterClick);
    })

})