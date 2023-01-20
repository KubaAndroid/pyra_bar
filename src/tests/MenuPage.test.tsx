import { fireEvent, render, screen, waitForElementToBeRemoved } from '@testing-library/react'
import userEvent from '@testing-library/user-event';
import { wait } from '@testing-library/user-event/dist/utils';
import { useEffect, useState } from 'react';
import { act } from 'react-dom/test-utils';
import { BrowserRouter } from 'react-router-dom';
import { OrderedItemsProvider, useOrderContext } from '../context/ShopContext';
import MenuItemModel from '../models/MenuItemModel';
import MenuPage from '../pages/MenuPage';
import TestWrapper from './TestWrapper';


const mockMenuItem: MenuItemModel = {
    id: 0,
    name: "Carrot Steak",
    price: 49.44,
    description: "Carrot Steak Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    imgUrl: "/img/steak_2.jpg",
    category: 'vege'
}

describe('render MenuPage', () => {

    it('checks if Loading screen is displayed when menu items list is empty', async () => {
        render(<TestWrapper children={ <MenuPage /> } />)
        const loadingTxt = screen.getByText(/Loading/)
        expect(loadingTxt.textContent).toBe("Loading...");
    })

    it('checks if menu items are fetched and rendered after LOADING disappears', async () => {
        render(<TestWrapper children={<MenuPage />} />);
        expect(screen.queryByText('Buy!')).not.toBeInTheDocument()
        await waitForElementToBeRemoved(() => screen.queryByText(/Loading/));
        let buyBtns = screen.getAllByText('Buy!')[0]
        expect(buyBtns).toBeInTheDocument()
    })

    it('checks if [Buy!] button changes after click', async () => {
        render(<TestWrapper children={<MenuPage />} />);
        await waitForElementToBeRemoved(() => screen.queryByText(/Loading/));
        const firstBuyBtn = screen.getAllByText('Buy!')[0];
        await act(() => userEvent.click(firstBuyBtn));
        expect(firstBuyBtn.textContent).toBe('-')

        // TODO: check if button changed to + 1 -
        
    })

    it('when entered x in SEARCH, all elements have x in title', async () => {
        render(<TestWrapper children={<MenuPage />} />);
        await waitForElementToBeRemoved(() => screen.queryByText(/Loading/));

        const searchInput = screen.getByPlaceholderText('search for a dish');

        await act(() => fireEvent.change(searchInput, { target: { value: 'curr' } }));

        setTimeout(() => {
            const menuItemNames = screen.getAllByRole('heading', { level: 3 });
            menuItemNames.forEach((e) => {
                expect(e.textContent!).toMatch(/Curr/)
            });
        }, 3000);
        

        // screen.debug()
    })

    it('after changing the category, all rendered items have that category', async () => {
        render(<TestWrapper children={<MenuPage />} />);
        await waitForElementToBeRemoved(() => screen.queryByText(/Loading/));

        const vegeCategoryButton = screen.getByText('Vege');
        await act(() => fireEvent.click(vegeCategoryButton));

        setTimeout(() => {
            const categoryImgs = screen.getAllByAltText('food category') as HTMLImageElement[];
            categoryImgs.forEach((image) => {
                expect(image.src!).toMatch(/plant/)

            });
        }, 3000);
        
        screen.debug()
    })

})
