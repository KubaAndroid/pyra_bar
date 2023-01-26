import { OrderedItemsContext } from "../context/ShopContext"
import MenuItemModel from "../models/MenuItemModel"
import db from '../../db.json'
import OrderItemModel from "../models/OrderItemModel"
import OrderModel from "../models/OrderModel"

export function createMockStore(): OrderedItemsContext {
    let allMenuItems: MenuItemModel[] = db['menuItems']
    let filteredMenuItems: MenuItemModel[] = allMenuItems
    const getOrderItemQuantity = jest.fn()
    const increaseOrderItemQuantity = jest.fn()
    const reduceOrderItemQuantity = jest.fn()
    const removeOrderItem = jest.fn()
    let orderQuantity = 0
    let orderedItems: OrderItemModel[] = []
    const setOrderItems = jest.fn()
    const setOrdersList = jest.fn()
    let orderedMenuItems: MenuItemModel[] = []
    const getAllMenuItems = async () => await allMenuItems
    const clearOrder = () => orderedItems = []
    const getMenuItemById = (id: number) => allMenuItems.find(item => item.id === id)
    let clientsList = db['users']
    const getClientById = (id: number) => clientsList.find(user => user.id === id)!
    const setFilteredMenuItems = jest.fn()
    const sortMenuItemsByPrice = (ascending: boolean) => jest.fn()
    const setClientsList = jest.fn()
    const filterMenuItems = (filterBy: string) => jest.fn()
    const searchMenuItems = (searchQuery: string) => jest.fn()
    let ordersList: OrderModel[] = []
    const getAllOrders = jest.fn()
    let currentFilter = ""
    let currentSorting = ""
    const setIsSnackbarVisible = jest.fn()
    const isSnackbarVisible = false
    const saveUser = jest.fn()
    const postOrder = jest.fn()

    const setIsModalOpen = jest.fn()
    let isModalOpen = false
    const setCurrentItem = jest.fn()
    let currentlySelectedMenuItem = allMenuItems[0]
    const setCurrentlySelectedMenuItem = jest.fn()

    return {
        getOrderItemQuantity,
        allMenuItems,
        filteredMenuItems,
        getMenuItemById,
        orderedItems,
        increaseOrderItemQuantity,
        reduceOrderItemQuantity,
        removeOrderItem,
        orderQuantity,
        setOrderItems,
        setOrdersList,
        orderedMenuItems,
        getAllMenuItems,
        clearOrder,
        clientsList,
        getClientById,
        setFilteredMenuItems,
        sortMenuItemsByPrice,
        setClientsList,
        filterMenuItems,
        searchMenuItems,
        ordersList,
        getAllOrders,
        currentFilter,
        currentSorting,
        setIsSnackbarVisible,
        isSnackbarVisible,
        saveUser,
        postOrder,
        setIsModalOpen,
        setCurrentItem,
        isModalOpen,
        currentlySelectedMenuItem,
        setCurrentlySelectedMenuItem
    }
}