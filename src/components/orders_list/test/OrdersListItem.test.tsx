import { render, screen } from '@testing-library/react'
import { FC, useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import OrdersListItem from '../OrdersListItem';
import { CreateOrderedItemsContext, OrderedItemsProvider, useOrderContext } from '../../../context/ShopContext';
import UserOrdersModel from '../../../models/UserOrdersModel';
import { createMockStore } from '../../../tests/TestWrapper';



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

// type OrderType = {
//   order: UserOrdersModel
// }

// const OrderListItemWrapper: FC<OrderType> = ({ order }: OrderType) => {
//     const [isExtended, setIsExtended] = useState<Boolean>(false)
//     const {
//         getMenuItemById,
//         getClientById
//     } = useOrderContext()

//     useEffect(() => {
//         setIsExtended(true)
//         setTimeout(() => {
//             // console.log(isExtended)
//         }, 2000)
//     })
//     return (
//         <>
//             <OrderedItemsProvider>
//                 <OrdersListItem order={order} />
//             </OrderedItemsProvider>
//         </>
//     )
// }


describe('render MenuItemView', () => {
    it('checks if ORDER ID is displayed correctly', () => {
        // render(<OrderListItemWrapper order={mockUserOrder} />)

        const store = createMockStore()
        render(
            <CreateOrderedItemsContext.Provider
                value={{
                    ...store
                }}>
                <BrowserRouter>
                    <OrdersListItem order={mockUserOrder} />
                </BrowserRouter>
            </CreateOrderedItemsContext.Provider> 
        )
        
        const orderNumber = screen.getByText(/Order/).textContent?.split(' ')[1]
        expect(orderNumber).toBe(`${mockUserOrder.id}`)
    })

})