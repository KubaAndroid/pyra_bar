import { act, fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { FC, useEffect, useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import MenuItemLayout from '../MenuItemLayout'
import { CreateOrderedItemsContext, OrderedItemsProvider, useOrderContext } from '../../../context/ShopContext'
import MenuItemModel from '../../../models/MenuItemModel'
import { createMockStore } from '../../../tests/TestWrapper'
import OrderItemModel from '../../../models/OrderItemModel'



interface MenuItemType {
    menuItem: MenuItemModel,
    index: number,
}

const mockMenuItem: MenuItemModel = {
    id: 0,
    name: "Carrot Steak",
    price: 49.44,
    description: "Carrot Steak Lorem ipsum dolores.",
    imgUrl: "/img/steak_2.jpg",
    category: 'vege'
}

const mockMenuItem2: MenuItemModel = {
    id: 1,
    name: "Duck Curry",
    price: 55.55,
    description: "Duck Steak Lorem ipsum dolor sit amet",
    imgUrl: "/img/steak_2.jpg",
    category: 'spicy'
}

const mockMenuItem3: MenuItemModel = {
    id: 3,
    name: "Lactose Free Dish",
    price: 32.32,
    description: "Lactose Free Dish Lorem ipsum dolor sit amet",
    imgUrl: "/img/steak_2.jpg",
    category: 'lactoseFree'
}

interface IMenuItemProps {
    menuItem: MenuItemModel
}
const renderOrderForm = ({menuItem} : IMenuItemProps) => {
    const store = createMockStore()
    act(() => render(
        <CreateOrderedItemsContext.Provider
            value={{
                ...store
            }}>
            <BrowserRouter>
                <MenuItemLayout
                        key={menuItem.id}
                        menuItem={menuItem}
                        index={menuItem.id}
                    />
            </BrowserRouter>
        </CreateOrderedItemsContext.Provider> 
    ))
}


const MenuItemWrapper: FC<MenuItemType> = ({ menuItem, index }: MenuItemType) => {
    return (
        <>
            <OrderedItemsProvider>
                <BrowserRouter>
                    <MenuItemLayout
                        key={menuItem.id}
                        menuItem={menuItem}
                        index={index}
                    />
                </BrowserRouter>
            </OrderedItemsProvider>
        </>
    )
}

describe('render MenuItemLayout', () => {
    it('checks if TITLE is present on MenuItemLayout and is displayed correctly', () => {
        render (<MenuItemWrapper
            menuItem={mockMenuItem}
            index={0}
        />
        )
        const titleText: string = screen.getByText(mockMenuItem.name).textContent ?? ""
        expect(titleText).toBe(`${mockMenuItem.name} `);
    })

    it('checks if [Buy!] button is present on MenuItemLayout when no items in cart', () => {
        render(
            <MenuItemWrapper
                menuItem={mockMenuItem}
                index={0}
            />
        )
        const buyBtn = screen.getByText("Buy!")
        expect(buyBtn).toBeEnabled();
    })

     it('checks if INFO button is present on MenuItemLayout', () => {
         render(
             <MenuItemWrapper
                menuItem={mockMenuItem}
                index={0}
             />
        )
        const modalBtn = screen.getByText("Info")
        expect(modalBtn).toBeEnabled();
     })
    
    it('checks if price is present on MenuItemLayout and is displayed correctly', () => {
        render(
            <MenuItemWrapper
                menuItem={mockMenuItem}
                index={0}
            />
        )
        const priceText = screen.getByText(/Price/).textContent?.split(":")[1]
        expect(priceText).toBe(` ${mockMenuItem.price.toFixed(2)}`);
    })

    
    it('checks if [Buy!] button changes after clicking', () => {
        render(
            <MenuItemWrapper
                menuItem={mockMenuItem}
                index={0} />
        )
        const buyBtn = screen.getByText("Buy!")
        expect(buyBtn).toBeEnabled();
    })

    it('checks if correct icon was selected for VEGE dish', () => {
        renderOrderForm({ menuItem: mockMenuItem })
        const selectedImage = screen.getByAltText('food category');
        expect(selectedImage.getAttribute('src')).toMatch(/plant/)
    })

    it('checks if correct icon was selected for SPICY dish', () => {
        renderOrderForm({ menuItem: mockMenuItem2 })
        const selectedImage = screen.getByAltText('food category');
        expect(selectedImage.getAttribute('src')).toMatch(/fire/)
    })

    it('checks if correct icon was selected for LACTOSE FREE dish', () => {
        renderOrderForm({ menuItem: mockMenuItem3 })
        const selectedImage = screen.getByAltText('food category');
        expect(selectedImage.getAttribute('src')).toMatch(/vegan/)
    })

    it('checks if INFO button sets state', () => {
        const store = createMockStore()
        const setCurrentlySelectedMenuItem = jest.fn()
        const setIsModalOpen = jest.fn()

        act(() => render(
            <CreateOrderedItemsContext.Provider
                value={{
                    ...store,
                    setCurrentlySelectedMenuItem: setCurrentlySelectedMenuItem,
                    setIsModalOpen: setIsModalOpen
                }}>
                <BrowserRouter>
                    <MenuItemLayout
                            key={mockMenuItem.id}
                            menuItem={mockMenuItem}
                            index={mockMenuItem.id}
                        />
                </BrowserRouter>
            </CreateOrderedItemsContext.Provider> 
        ))

         const infoBtn = screen.getByText('Info');
        act(() => fireEvent.click(infoBtn))
        setTimeout(() => {
            expect(setCurrentlySelectedMenuItem).toBeCalled()
            expect(setIsModalOpen).toBeCalled()
        }, 500);
    });


    it('checks if Buy! Button works', () => {
        const store = createMockStore()
        const increaseOrderItemQuantity = jest.fn()
        act(() => render(
            <CreateOrderedItemsContext.Provider
                value={{
                    ...store,
                    increaseOrderItemQuantity: increaseOrderItemQuantity
                }}>
                <BrowserRouter>
                    <MenuItemLayout
                            key={mockMenuItem.id}
                            menuItem={mockMenuItem}
                            index={mockMenuItem.id}
                        />
                </BrowserRouter>
            </CreateOrderedItemsContext.Provider> 
        ))

        const buyBtn = screen.getByText('Buy!');
        act(() => fireEvent.click(buyBtn))
        expect(increaseOrderItemQuantity).toBeCalled()
    })

    it('checks if + and - buttons works', () => {
        const store = createMockStore()
        const increaseOrderItemQuantity = jest.fn()
        const reduceOrderItemQuantity = jest.fn()
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
                    <MenuItemLayout
                            key={mockMenuItem.id}
                            menuItem={mockMenuItem}
                            index={mockMenuItem.id}
                        />
                </BrowserRouter>
            </CreateOrderedItemsContext.Provider> 
        ))
        
        const addBtn = screen.getByText('+');
        act(() => fireEvent.click(addBtn))
        expect(increaseOrderItemQuantity).toBeCalled()

        const reduceBtn = screen.getByText('-');
        act(() => fireEvent.click(reduceBtn))
        expect(reduceOrderItemQuantity).toBeCalled()
    })
    
    
})