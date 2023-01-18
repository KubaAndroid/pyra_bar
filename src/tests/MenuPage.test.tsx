import { render, screen } from '@testing-library/react'
import { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { OrderedItemsProvider, useOrderContext } from '../context/ShopContext';
import MenuItemModel from '../models/MenuItemModel';
import MenuPage from '../pages/MenuPage';


const mockMenuItem: MenuItemModel = {
    id: 0,
    name: "Carrot Steak",
    price: 49.44,
    description: "Carrot Steak Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    imgUrl: "/img/steak_2.jpg",
    category: 'vege'
}

const MenuPageWrapper = () => {
    
    return (
        <>
            <OrderedItemsProvider>
                <BrowserRouter>
                    <MenuPage />
                </BrowserRouter>
            </OrderedItemsProvider>
        </>
    )
}


describe('render MenuPage', () => {
    it('checks if Loading screen is displayed when menu items list is empty', async () => {
        render(<MenuPageWrapper />)
        // setTimeout(() => {
            const loadingTxt = screen.getByText(/Loading/)
            expect(loadingTxt.textContent).toBe("Loading...");

        // }, 6000);
        
    })



})
