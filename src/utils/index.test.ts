import { act, fireEvent, render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import { clearOrder, fetchMenuItems, fetchOrders, getAllMenuItems, getAllOrders, getMenuItemById, getOrderItemQuantity, getOrderQuantity, postOrder, saveUser } from '.';
import ClientModel from '../models/ClientModel';
import MenuItemModel from '../models/MenuItemModel';
import OrderItemModel from '../models/OrderItemModel';
import OrderModel from '../models/OrderModel';
import UserOrdersModel from '../models/UserOrdersModel';

describe('testing UTIL functions', () => {

    it('checks if menu items are fetching', async () => {
        const mockMenuItem: MenuItemModel = {
            "id": 0,
            "name": "Carrot Steak",
            "price": 49.44,
            "description": "Carrot Steak Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            "imgUrl": "/img/steak_2.jpg",
            "category": "vege"
        }
        
        setTimeout(async() => {
            let fetchedMenuItems: MenuItemModel[] = await fetchMenuItems();
            expect(fetchedMenuItems.length).toBeGreaterThanOrEqual(1);
            expect(mockMenuItem.name).toBe(getMenuItemById(0, fetchedMenuItems)?.name)
        }, 1000);
        
    });

    it('checks if orders are fetching', async () => {
        const mockOrderItem: UserOrdersModel = {
            "id": 0,
            "userId": 15,
            "date": "23-6-2022 8:35",
            "menuItems": [
                29,
                32,
                26,
                32,
                3,
                32
            ]
        }
        setTimeout(async() => {
            const fetchedOrders: UserOrdersModel[] = await fetchOrders();
            expect(fetchedOrders.length).toBeGreaterThanOrEqual(1);
            const foundOrder = fetchedOrders.find(order => order.id === mockOrderItem.id)
            expect(mockOrderItem.date).toBe(foundOrder?.date)
        }, 1000);
    });

    it('checks if order quantity is calculated correctly', () => {
        const mockOrder: OrderItemModel[] = [
            {
                id: 0,
                name: "order 1",
                quantity: 5,
                price: 12.34
            },
            {
                id: 1,
                name: "order 2",
                quantity: 3,
                price: 32.23
            }
        ];
        const quantityTotal = getOrderQuantity(mockOrder);
        expect(quantityTotal).toBe(mockOrder[0].quantity + mockOrder[1].quantity)
    });

    it('check if saveUser changes state', () => {
        const currentDate = new Date();
        const user: ClientModel = {
            id: currentDate.getTime()
        };
        const clientsList: ClientModel[] = [];
        const setClientsList = jest.fn()
        act(async() => await saveUser(user, clientsList, setClientsList));
        setTimeout(() => {
            expect(setClientsList).toHaveBeenCalled()
        }, 1200);
    });

    it('check if postOrder changes state', () => {
        const currentDate = new Date();
        const order: UserOrdersModel = {
            "userId": currentDate.getTime(),
            "date": "Wed, 25 Jan 2023 13:44:40",
            "menuItems": [1,1,2,1],
            "id": currentDate.getTime()
        };
        const setIsSnackbarVisible = jest.fn()
        act(async() => await postOrder(order, setIsSnackbarVisible));
        setTimeout(() => {
            expect(setIsSnackbarVisible).toHaveBeenCalled()
        }, 1500);
    });

    it('checks if order quantity is calculated correctly', () => {
        const mockOrder: OrderItemModel[] = [
            {
                id: 0,
                name: "order 1",
                quantity: 5,
                price: 12.34
            },
            {
                id: 1,
                name: "order 2",
                quantity: 3,
                price: 32.23
            }
        ];
        const quantityTotal = getOrderItemQuantity(0, mockOrder);
        expect(quantityTotal).toBe(mockOrder[0].quantity);
    });

    it('checks if getAllOrders works correctly', async () => {
        const setOrdersList = jest.fn();
        let allOrders: OrderModel[];
        act(async () => allOrders = await getAllOrders(setOrdersList));
        setTimeout(() => {
            expect(setOrdersList).toHaveBeenCalled();
        }, 1200);
    });

    it('checks if getAllMenuItems works correctly if items are already in array', async () => {
        const setMenuItems = jest.fn()
        const setFilteredMenuItems = jest.fn()
        const allMenuItems: MenuItemModel[] = [
            {
                "id": 0,
                "name": "Carrot Steak",
                "price": 49.44,
                "description": "Carrot Steak Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                "imgUrl": "/img/steak_2.jpg",
                "category": "vege"
            }
        ]

        let fetchedMenuItems: MenuItemModel[]
        act(async () => fetchedMenuItems = await getAllMenuItems(allMenuItems, setMenuItems, setFilteredMenuItems));

        setTimeout(() => {
            expect(fetchedMenuItems.length).toBeGreaterThanOrEqual(1);
            expect(setMenuItems).toHaveBeenCalled();
            expect(setFilteredMenuItems).toHaveBeenCalled();
        }, 1200);
    });


    it('checks if getAllMenuItems works correctly if array is empty', async () => {
        const setMenuItems = jest.fn()
        const setFilteredMenuItems = jest.fn()
        const allMenuItems: MenuItemModel[] = []
        let fetchedMenuItems: MenuItemModel[]
        act(async () => fetchedMenuItems = await getAllMenuItems(allMenuItems, setMenuItems, setFilteredMenuItems));
        setTimeout(() => {
            expect(fetchedMenuItems.length).toBeGreaterThanOrEqual(1);
            expect(setMenuItems).toHaveBeenCalled();
            expect(setFilteredMenuItems).toHaveBeenCalled();
        }, 1200);
    });

    it('checks if clearOrder clears order', () => {
        const setOrderItems = jest.fn();
        const setOrderedMenuItems = jest.fn()
        clearOrder(setOrderItems, setOrderedMenuItems);
        expect(setOrderItems).toHaveBeenCalled()
        expect(setOrderedMenuItems).toHaveBeenCalled()
    })
    
    
})