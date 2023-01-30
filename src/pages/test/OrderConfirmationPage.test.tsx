import { render, } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { CreateOrderedItemsContext } from "../../context/ShopContext";
import { createMockStore } from "../../tests/TestWrapper";
import OrderConfirmationPage from '../OrderConfirmationPage'

describe('render OrderConfirmation Page', () => {
    it('checks if page renders', () => {
        const store = createMockStore()
        render( 
            <CreateOrderedItemsContext.Provider
                value={{
                    ...store
                }}>
                <BrowserRouter>
                    <OrderConfirmationPage />
                </BrowserRouter>
            </CreateOrderedItemsContext.Provider>
        );
    });
})