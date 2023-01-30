import { act, fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { CreateOrderedItemsContext } from "../../../context/ShopContext";
import { createMockStore } from "../../../tests/TestWrapper";
import OrderSnackbar from "../OrderSnackbar";

describe('render OrderSnackbar', () => {
    
    it('checks if snackbar renders', async () => {
        const store = createMockStore();
        const setOrderItems = jest.fn() 
        const setOrderedMenuItems = jest.fn()
        await act(() => render(
            <CreateOrderedItemsContext.Provider
                value={{
                    ...store,
                    setOrderItems: setOrderItems,
                    setOrderedMenuItems: setOrderedMenuItems
                }}>
                <BrowserRouter>
                    <OrderSnackbar />
                </BrowserRouter>
            </CreateOrderedItemsContext.Provider>
        ));

        const okButton = screen.getByText('OK');
        act(() => fireEvent.click(okButton));
        setTimeout(() => {
            expect(setOrderItems).toBeCalled();
            expect(setOrderedMenuItems).toBeCalled();
        });
    });

});