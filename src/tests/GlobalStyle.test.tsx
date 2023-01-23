import { render, screen } from '@testing-library/react'
import OrderPage from "../pages/OrderPage"
import Wrapper from "./TestWrapper"

describe("render OrderPage", () => {

    it('checks if OrderPage with empty cart renders correctly', () => {
        render(<Wrapper children={<OrderPage />} />)

        const element = screen.getByText(/Cart/);
        const styles = getComputedStyle(element);

        expect(styles.fontFamily).toBe('Poppins');
        
    })
})

    