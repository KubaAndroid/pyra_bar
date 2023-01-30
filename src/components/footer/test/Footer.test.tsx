import { render, screen } from '@testing-library/react'
import { BrowserRouter } from "react-router-dom"
import { CreateOrderedItemsContext } from "../../../context/ShopContext"
import { createMockStore } from "../../../tests/TestWrapper"
import Footer from '../Footer'



describe("render Footer component", () => {
    it('checks if Footer renders correctly', () => {
        render(
            <BrowserRouter>
                <Footer />
            </BrowserRouter>
        );
        const footerCopyRightText = screen.getByText(/Copyright/).textContent;
        expect(footerCopyRightText).toBe('Copyright © 2023');
    });
})