import { act, fireEvent, render, screen } from '@testing-library/react'
import { createMockStore } from "../../../tests/TestWrapper"
import OrderForm from "../OrderForm"
import userEvent from "@testing-library/user-event"
import ClientModel from "../../../models/ClientModel"
import { CreateOrderedItemsContext } from "../../../context/ShopContext"
import { BrowserRouter } from "react-router-dom"
import MenuItemModel from "../../../models/MenuItemModel"

const renderOrderForm = async () => {
    const store = createMockStore();
    await act(() => render(
        <CreateOrderedItemsContext.Provider
            value={{
                ...store
            }}>
            <BrowserRouter>
                <OrderForm />
            </BrowserRouter>
        </CreateOrderedItemsContext.Provider>
    ));
}
    
describe("render OrderForm component", () => {

    it('checks if errors appear when inputs are not filled', async () => {
        renderOrderForm();
        const orderBtn = screen.getByRole('button');
        await act(async () => {userEvent.click(orderBtn)});
        const alerts = screen.getAllByRole('alert');
        expect(alerts[0]).toBeInTheDocument();
    })

    
    it('checks if errors dont appear when inputs are filled', async () => {
        renderOrderForm();

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
        await act(async () => {userEvent.click(orderBtn)});

        const alerts = screen.queryAllByRole('alert')
        expect(alerts.length).toBe(0)
        
    })

    it('checks if a new client is added after all inputs are filled', async () => {
        const store = createMockStore();
        const mockModel: MenuItemModel = {
            id: 0,
            name: 'Spaghet',
            price: 12.23,
            description: 'Delish Spaghet',
            imgUrl: '/img/1.jpg',
            category: 'Spicy'
        }

        const clientsList: ClientModel[] = []
        let isSnackbarVisible = false
        const orderedMenuItems: MenuItemModel[] = [mockModel]
        
        render(
            <CreateOrderedItemsContext.Provider
                value={{
                    ...store,
                    clientsList: clientsList,
                    isSnackbarVisible: isSnackbarVisible,
                    orderedMenuItems: orderedMenuItems
                }}>
                <BrowserRouter>
                    <OrderForm />
                </BrowserRouter>
            </CreateOrderedItemsContext.Provider>
        )
        expect(isSnackbarVisible).toBe(false);

        const fNameInput = screen.getByPlaceholderText('First name');
        await act(() => fireEvent.change(fNameInput, { target: { value: 'John' } }))
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

        setTimeout(() => {

            const orderBtn = screen.getByRole('button');
            act(async () => {userEvent.click(orderBtn)});
            const alerts = screen.queryAllByRole('alert');
            expect(alerts.length).toBe(0);
        }, 1000);

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
        
        setTimeout(() => {
            expect(clientsList[0].firstName).toBe(newClient.firstName);
            expect(clientsList[0].lastName).toBe(newClient.lastName);
            expect(clientsList[0].emailAddress).toBe(newClient.emailAddress);
            expect(clientsList[0].phoneNumber).toBe(newClient.phoneNumber);
            expect(clientsList[0].addressStreet).toBe(newClient.addressStreet);
            expect(clientsList[0].addressCity).toBe(newClient.addressCity);

            expect(isSnackbarVisible).toBe(true)
        }, 1500);
    });


    it('check if snackbar is being showed', async () => {
        const store = createMockStore()
        const mockModel: MenuItemModel = {
            id: 0,
            name: 'Spaghet',
            price: 12.23,
            description: 'Delish Spaghet',
            imgUrl: '/img/1.jpg',
            category: 'Spicy'
        }
        const setIsSnackbarVisible = jest.fn();
        const clearOrder = jest.fn();
        const isSnackbarVisible = false
        act(() => render(
            <CreateOrderedItemsContext.Provider
                value={{
                    ...store,
                    setIsSnackbarVisible: setIsSnackbarVisible,
                    clearOrder: clearOrder,
                    isSnackbarVisible: isSnackbarVisible
                }}>
                <BrowserRouter>
                    <OrderForm />
                </BrowserRouter>
            </CreateOrderedItemsContext.Provider>
        ));

        const fNameInput = screen.getByPlaceholderText('First name');
        await act(() => fireEvent.change(fNameInput, { target: { value: 'John' } }))
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
        const orderBtn = screen.getByRole('button');
        await act(async () => {
            userEvent.click(orderBtn);
        });
        setTimeout(() => {

        })
        expect(setIsSnackbarVisible).toBeCalled();
        expect(clearOrder).toBeCalled();
    });
    
})