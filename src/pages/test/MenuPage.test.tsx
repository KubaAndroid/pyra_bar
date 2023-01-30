import { fireEvent, render, screen, waitForElementToBeRemoved, waitFor } from '@testing-library/react'
import { act } from 'react-dom/test-utils';
import { BrowserRouter } from 'react-router-dom';
import { CreateOrderedItemsContext, OrderedItemsProvider } from '../../context/ShopContext';
import { createMockStore } from '../../tests/TestWrapper';
import MenuPage from '../MenuPage';


const renderMenuPage = async () => {
    const store = createMockStore()
    await act(() => render(
        <CreateOrderedItemsContext.Provider
            value={{
                ...store
            }}>
            <BrowserRouter>
                <MenuPage />
            </BrowserRouter>
        </CreateOrderedItemsContext.Provider>
    ));

}

describe('render MenuPage', () => {
    it('when entered x in SEARCH, all elements have x in title', async () => {
        renderMenuPage();
        const searchInput = screen.getByPlaceholderText('search for a dish');
        await act(() => fireEvent.change(searchInput, { target: { value: 'curr' } }));
        setTimeout(() => {
            const menuItemNames = screen.getAllByRole('heading', { level: 3 });
            menuItemNames.forEach((e) => {
                expect(e.textContent!).toMatch(/Curr/);
            });
        }, 2000);
    })

    it('after changing the category, all rendered items have that category', async () => {
        renderMenuPage();

        if (screen.queryAllByText(/Loading/).length > 0) {
            await waitForElementToBeRemoved(() => screen.queryByText(/Loading/));
        }

        const vegeCategoryButton = screen.getByText('Vege');
        await act(() => fireEvent.click(vegeCategoryButton));
        setTimeout(() => {
            const categoryImgs = screen.getAllByAltText('food category') as HTMLImageElement[];
            categoryImgs.forEach((image) => {
                expect(image.src!).toMatch(/plant/);
            });
        }, 2000);
    });

    it('checks if menu items are sorted by price ASCENDING', async () => {
        renderMenuPage();
        const sortAscButton = screen.getByText('Asc');
        await act(() => fireEvent.click(sortAscButton));
        setTimeout(() => {
            const menuPrices = screen.getAllByText(/Price/)
            expect(isPriceArraySorted(menuPrices, true)).toBe(true);
        }, 2000);
    });

    it('checks if filtering is executed when SORT buttons are pressed', async () => {
        const store = createMockStore();
        const filterMenuItems = jest.fn();

        await act(() => render(
            <CreateOrderedItemsContext.Provider
                value={{
                    ...store,
                    filterMenuItems: filterMenuItems
                }}>
                <BrowserRouter>
                    <MenuPage />
                </BrowserRouter>
            </CreateOrderedItemsContext.Provider>
        ));

        const allButton = screen.getByAltText('all');
        act(() => fireEvent.click(allButton));
        expect(filterMenuItems).toBeCalled();

        const spicyButton = screen.getByAltText('spicy');
        act(() => fireEvent.click(spicyButton));
        expect(filterMenuItems).toBeCalled();

        const vegeButton = screen.getByAltText('vege');
        act(() => fireEvent.click(vegeButton));
        expect(filterMenuItems).toBeCalled();
        
        const lactoseButton = screen.getByAltText('lactoseFree');
        act(() => fireEvent.click(lactoseButton));
        expect(filterMenuItems).toBeCalled();
    });

    it('checks if sorting is executed when SORT ASC/DESC buttons are pressed', async () => {
        const store = createMockStore();
        const sortMenuItemsByPrice = jest.fn();

        await act(() => render(
            <CreateOrderedItemsContext.Provider
                value={{
                    ...store,
                    sortMenuItemsByPrice: sortMenuItemsByPrice
                }}>
                <BrowserRouter>
                    <MenuPage />
                </BrowserRouter>
            </CreateOrderedItemsContext.Provider>
        ));
        const ascButton = screen.getByText('Asc');
        act(() => fireEvent.click(ascButton));
        expect(sortMenuItemsByPrice).toBeCalled();

        const descButton = screen.getByText('Desc');
        act(() => fireEvent.click(descButton));
        expect(sortMenuItemsByPrice).toBeCalled();

    });
})

function isPriceArraySorted(arr: HTMLElement[], ascending: boolean) {  
    let flag = true;
    if (ascending) {
        for (let i = 1; i < arr.length; i++) {
            if (arr[i - 1] > arr[i]) {
                flag = false;
            }
        }
    } else {
        for (let i = 1; i < arr.length; i++) {
            if (arr[i - 1] < arr[i]) {
                flag = false;
            }
        }
    }
    return flag;
} 