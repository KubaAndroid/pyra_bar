import { fireEvent, render, screen, waitForElementToBeRemoved } from '@testing-library/react'
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import MenuPage from '../pages/MenuPage';
import OrdersListPage from '../pages/OrdersListPage';
import Wrapper from './TestWrapper';
import TestWrapper, { MockWrapper } from './TestWrapper';


describe('render OrdersListPage', () => {

    it('checks if Loading screen is displayed when menu items list is empty', async () => {

        render(<Wrapper children={<OrdersListPage />} />)
        const loadingTxt = screen.getByText(/Loading/)
        expect(loadingTxt.textContent).toBe("Loading...");
    })
})