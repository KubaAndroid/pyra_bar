import { fireEvent, render, screen, waitForElementToBeRemoved } from '@testing-library/react'
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import MenuPage from '../pages/MenuPage';
import TestWrapper, { MockWrapper } from './TestWrapper';


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
        expect(firstBuyBtn.textContent).toBe('-');
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
        }, 2000);

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
        }, 2000);
    })

    it('checks if menu items are sorted by price ASCENDING', async () => {
        render(<TestWrapper children={<MenuPage />} />);
        await waitForElementToBeRemoved(() => screen.queryByText(/Loading/));

        const sortAscButton = screen.getByText('Asc');
        await act(() => fireEvent.click(sortAscButton));

        setTimeout(() => {
            const menuPrices = screen.getAllByText(/Price/)
            expect(isPriceArraySorted(menuPrices, true)).toBe(true);
        }, 2000);
    })

    it('checks if menu items are sorted by price DESCENDING', async () => {
        render(<TestWrapper children={<MenuPage />} />);
        await waitForElementToBeRemoved(() => screen.queryByText(/Loading/));

        const sortDescButton = screen.getByText('Desc');
        await act(() => fireEvent.click(sortDescButton));

        setTimeout(() => {
            const menuPrices = screen.getAllByText(/Price/)
            expect(isPriceArraySorted(menuPrices, false)).toBe(true);
        }, 2000);
    })

})

function isPriceArraySorted(arr: HTMLElement[], ascending: boolean) {  
    let flag = true
    if (ascending) {
        for (let i = 1; i < arr.length; i++) {
            if (arr[i - 1] > arr[i]) {
                flag = false
            }
        }
    } else {
        for (let i = 1; i < arr.length; i++) {
            if (arr[i - 1] < arr[i]) {
                flag = false
            }
        }
    }
    return flag
} 