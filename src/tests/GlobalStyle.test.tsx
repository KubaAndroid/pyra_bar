import { render, screen } from '@testing-library/react'
import ContactForm from '../components/contact/ContactForm'
import OrderPage from "../pages/OrderPage"
import Wrapper from "./TestWrapper"

describe("check GlobalStyles", () => {

    it('checks if GlobalStyles font is correct', () => {
        render(<Wrapper children={<ContactForm />} />)

        // const element = screen.getByText(/Contact/);
        // const styles = getComputedStyle(element);
        // console.log(styles)
        // expect(styles.fontFamily).toBe('Poppins');

        // const formClass = ContactForm().type.styledComponentId
        // const MyHeaderRoots = document.getElementsByClassName(formClass)

        // const style = window.getComputedStyle(MyHeaderRoots[0])
        // expect(style.fontFamily).toBe('Poppins')

        
    })
})

    