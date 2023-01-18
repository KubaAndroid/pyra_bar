import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { FC, useEffect, useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import MenuItemLayout from '../components/menu/MenuItemView'
import { OrderedItemsProvider, useOrderContext } from '../context/ShopContext'
import MenuItemModel from '../models/MenuItemModel'



interface MenuItemType {
    menuItem: MenuItemModel,
    index: number,
}

const mockMenuItem: MenuItemModel = {
    id: 0,
    name: "Carrot Steak",
    price: 49.44,
    description: "Carrot Steak Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    imgUrl: "/img/steak_2.jpg",
    category: 'vege'
}


const MenuItemWrapper: FC<MenuItemType> = ({ menuItem, index }: MenuItemType) => {
    const [isModalOpen, setIsModalOpen] = useState<Boolean>(false);
  const [currentlySelectedMenuItem, setCurrentlySelectedMenuItem] = useState<MenuItemModel>(menuItem);

    
    return (
        <>
            <OrderedItemsProvider>
                <BrowserRouter>
                    <MenuItemLayout
                        key={menuItem.id}
                        menuItem={menuItem}
                        index={index}
                        setIsModalOpen={setIsModalOpen}
                        setCurrentItem={setCurrentlySelectedMenuItem}
                    />
                </BrowserRouter>
            </OrderedItemsProvider>
        </>
    )
}

describe('render MenuItemView', () => {
    it('checks if TITLE is present on MenuItemView and is displayed correctly', () => {
        render (<MenuItemWrapper
            menuItem={mockMenuItem}
            index={0}
        />
        )
        const titleText: string = screen.getByText(mockMenuItem.name).textContent ?? ""
        expect(titleText).toBe(`${mockMenuItem.name} `);
    })

    it('checks if [Buy!] button is present on MenuItemView when no items in cart', () => {
        render (<MenuItemWrapper
            menuItem={mockMenuItem}
            index={0} />
        )
        const buyBtn = screen.getByText("Buy!")
        expect(buyBtn).toBeEnabled();
    })

     it('checks if INFO button is present on MenuItemView', () => {
        render (<MenuItemWrapper
            menuItem={mockMenuItem}
            index={0} />
        )
        const modalBtn = screen.getByText("Info")
        expect(modalBtn).toBeEnabled();
     })
    
    it('checks if price is present on MenuItemView and is displayed correctly', () => {
        render (<MenuItemWrapper
            menuItem={mockMenuItem}
            index={0} />
        )
        const priceText = screen.getByText(/Price/).textContent?.split(":")[1]
        expect(priceText).toBe(` ${mockMenuItem.price.toFixed(2)}`);
    })

    /**
    it('checks if [Buy!] button changes after clicking', () => {
        render(
            <MenuItemWrapper
                menuItem={mockMenuItem}
                index={0} />
        )
        
        const buyBtn = screen.getByText("Buy!")
        expect(buyBtn).toBeEnabled();
        userEvent.click(buyBtn)
        // ERROR: couldn't find menuItem in state in context
        screen.debug()
    })
      */
})