import { act, fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import App from "../App";
import { CreateOrderedItemsContext } from "../context/ShopContext";
import { createMockStore } from "./TestWrapper";

describe('render App component', () => {
    it('checks if App renders corrrectly', () => {
        const store = createMockStore();
        render(
            <CreateOrderedItemsContext.Provider
                value={{
                    ...store
                }}>
                <App />
        </CreateOrderedItemsContext.Provider>)
    });
})