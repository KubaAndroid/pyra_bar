import React, { FC } from "react"
import { act, fireEvent, render, screen } from '@testing-library/react'
import { MockWrapper } from "./TestWrapper"
import OrderForm from "../components/order/OrderForm"
import userEvent from "@testing-library/user-event"
import TestWrapper from "./TestWrapper"
import ClientModel from "../models/ClientModel"


describe("render OrderForm component", () => {

    it('checks if errors appear when inputs are not filled', async () => {
        render(<TestWrapper children={<OrderForm /> }/>)
        const orderBtn = screen.getByRole('button')
        await act(async () => {
            userEvent.click(orderBtn)
        });
        const alerts = screen.getAllByRole('alert')
        expect(alerts[0]).toBeInTheDocument()
    })

    
    it('checks if errors dont appear when inputs are filled', async () => {
        render(<TestWrapper children={<OrderForm /> }/>)

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
        
    })
/**
    it('checks if a new client is added after all inputs are filled', async () => {
        render(<TestWrapper children={<OrderForm /> }/>)

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
        
        setTimeout(() => {
            expect(clientsList[clientsList.length - 1].firstName).toBe(newClient.firstName)
            expect(clientsList[clientsList.length - 1].lastName).toBe(newClient.lastName)
            expect(clientsList[clientsList.length - 1].emailAddress).toBe(newClient.emailAddress)
            expect(clientsList[clientsList.length - 1].phoneNumber).toBe(newClient.phoneNumber)
            expect(clientsList[clientsList.length - 1].addressStreet).toBe(newClient.addressStreet)
            expect(clientsList[clientsList.length - 1].addressCity).toBe(newClient.addressCity)
        }, 1000)

        
        
    })
 */
    
})