import { act, fireEvent, render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { CreateOrderedItemsContext } from '../../../context/ShopContext'
import MenuItemModel from '../../../models/MenuItemModel'
import OrderItemModel from '../../../models/OrderItemModel'
import { createMockStore } from '../../../tests/TestWrapper'
import MenuModal from '../MenuModal'

describe('testing Menu Modal', () => {
    it('checks if Buy! Button works', () => {
        const store = createMockStore()
        const increaseOrderItemQuantity = jest.fn()
        const reduceOrderItemQuantity = jest.fn()
        const openedModal = jest.fn()
        const mockModel: MenuItemModel = {
            id: 0,
            name: 'Spaghetti',
            price: 12.23,
            description: 'Delish Spaghet',
            imgUrl: '/img/1.jpg',
            category: 'Spicy'
        }

        act(() => render(
            <CreateOrderedItemsContext.Provider
                value={{
                    ...store,
                    increaseOrderItemQuantity: increaseOrderItemQuantity,
                    reduceOrderItemQuantity: reduceOrderItemQuantity
                }}>
                <BrowserRouter>
                    <MenuModal openedModal={openedModal} menuItem={mockModel}  />
                </BrowserRouter>
            </CreateOrderedItemsContext.Provider> 
        ));

        const buyBtn = screen.getByText('Buy');
        act(() => fireEvent.click(buyBtn))
        expect(increaseOrderItemQuantity).toBeCalled()
    });

    it('checks if + and - buttons works', () => {
        const store = createMockStore()
        const increaseOrderItemQuantity = jest.fn()
        const reduceOrderItemQuantity = jest.fn()
        const openedModal = jest.fn()
        const mockModel: MenuItemModel = {
            id: 0,
            name: 'Spaghetti',
            price: 12.23,
            description: 'Delish Spaghet',
            imgUrl: '/img/1.jpg',
            category: 'Spicy'
        }
        const orderedItems: OrderItemModel[] = [{
            id: 0,
            name: "Pie",
            quantity: 1,
            price: 11.11
        }]
        act(() => render(
            <CreateOrderedItemsContext.Provider
                value={{
                    ...store,
                    increaseOrderItemQuantity: increaseOrderItemQuantity,
                    reduceOrderItemQuantity: reduceOrderItemQuantity,
                    orderedItems: orderedItems
                }}>
                <BrowserRouter>
                <MenuModal openedModal={openedModal} menuItem={mockModel}  />
                </BrowserRouter>
            </CreateOrderedItemsContext.Provider> 
        ))
        
        // const addBtn = screen.getByText('Buy');
        // act(() => fireEvent.click(addBtn))
        // expect(increaseOrderItemQuantity).toBeCalled()

        const reduceBtn = screen.getByText('-');
        act(() => fireEvent.click(reduceBtn))
        expect(reduceOrderItemQuantity).toBeCalled()
    });

    it('checks if X button calls setState', () => {
        const store = createMockStore()
        const increaseOrderItemQuantity = jest.fn()
        const reduceOrderItemQuantity = jest.fn()
        const openedModal = jest.fn()
        const mockModel: MenuItemModel = {
            id: 0,
            name: 'Spaghetti',
            price: 12.23,
            description: 'Delish Spaghet',
            imgUrl: '/img/1.jpg',
            category: 'Spicy'
        }
        act(() => render(
            <CreateOrderedItemsContext.Provider
                value={{
                    ...store,
                    increaseOrderItemQuantity: increaseOrderItemQuantity,
                    reduceOrderItemQuantity: reduceOrderItemQuantity
                }}>
                <BrowserRouter>
                <MenuModal openedModal={openedModal} menuItem={mockModel}  />
                </BrowserRouter>
            </CreateOrderedItemsContext.Provider> 
        ))
        
        const closeBtn = screen.getByText('X');
        act(() => fireEvent.click(closeBtn));
        expect(openedModal).toBeCalled();
    });
    
})

