import { act, fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import ContactForm from '../components/contact/ContactForm'
import OrderForm from '../components/order/OrderForm'
import { CreateOrderedItemsContext } from '../context/ShopContext'
import ClientModel from '../models/ClientModel'
import OrderPage from "../pages/OrderPage"
import Wrapper, { createMockStore } from "./TestWrapper"


describe("check GlobalStyles", () => {
    test('Check if context store works', async () => {
        const store = createMockStore()
        const mockSetstate = jest.fn()
        render(
            <CreateOrderedItemsContext.Provider
                value={{...store,  allMenuItems: []}}
            >

            </CreateOrderedItemsContext.Provider> 
        )
    })

    test('checks if a new client is added after all inputs are filled', async () => {
        const store = createMockStore()
        render(
            <CreateOrderedItemsContext.Provider value={{...store,  allMenuItems: []}}>
                <BrowserRouter>
                    <OrderForm />
                </BrowserRouter>
            </CreateOrderedItemsContext.Provider> 
        )

        const fNameInput = screen.getByPlaceholderText('First name');
        await act(() => fireEvent.change(fNameInput, {target: { value: 'John' }}))
        const lNameInput = screen.getByPlaceholderText('Last name');
        await act(() => fireEvent.change(lNameInput, { target: { value: 'Doe' } }));
        const emailInput = screen.getByPlaceholderText('Email');
        await act(() => fireEvent.change(emailInput, { target: { value: 'john@doe.com' } }));
        const phoneInput = screen.getByPlaceholderText('Mobile number');
        await act(() => fireEvent.change(phoneInput, { target: { value: '123456789' } }));
        const streetInput = screen.getByPlaceholderText('Street');
        await act(() => fireEvent.change(streetInput, { target: { value: 'Long street' } }));
        const streetNumInput = screen.getByPlaceholderText('Street number');
        await act(() => fireEvent.change(streetNumInput, { target: { value: '126e/12' } }));
        const cityInput = screen.getByPlaceholderText('City');
        await act(() => fireEvent.change(cityInput, { target: { value: 'Washington DC' } }));
        const zipInput = screen.getByPlaceholderText('Zip code');
        await act(() => fireEvent.change(zipInput, { target: { value: '20023' } }));
        const orderBtn = screen.getByRole('button')
        await act(async () => {
            userEvent.click(orderBtn)
        });
        const alerts = screen.queryAllByRole('alert')
        expect(alerts.length).toBe(0)

        let newClient: ClientModel = {
            id: 0,
            firstName: fNameInput.textContent!,
            lastName: lNameInput.textContent!,
            emailAddress: emailInput.textContent!,
            phoneNumber: phoneInput.textContent!,
            addressStreet: streetInput.textContent!,
            addressNumber: streetNumInput.textContent!,
            addressCity: cityInput.textContent!
        }
        
        // setTimeout(() => {
        //     expect(clientsList[clientsList.length - 1].firstName).toBe(newClient.firstName)
        //     expect(clientsList[clientsList.length - 1].lastName).toBe(newClient.lastName)
        //     expect(clientsList[clientsList.length - 1].emailAddress).toBe(newClient.emailAddress)
        //     expect(clientsList[clientsList.length - 1].phoneNumber).toBe(newClient.phoneNumber)
        //     expect(clientsList[clientsList.length - 1].addressStreet).toBe(newClient.addressStreet)
        //     expect(clientsList[clientsList.length - 1].addressCity).toBe(newClient.addressCity)
        // }, 1000)

        
        
    })
})
