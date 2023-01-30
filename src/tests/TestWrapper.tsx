import { OrderedItemsContext } from "../context/ShopContext"
import MenuItemModel from "../models/MenuItemModel"
import db from '../../db.json'
import OrderItemModel from "../models/OrderItemModel"
import OrderModel from "../models/OrderModel"

export function createMockStore(): OrderedItemsContext {
    let allMenuItems: MenuItemModel[] = db['menuItems']
    const setMenuItems= jest.fn()
    let filteredMenuItems: MenuItemModel[] = allMenuItems
    const increaseOrderItemQuantity = jest.fn()
    const reduceOrderItemQuantity = jest.fn()
    const removeOrderItem = jest.fn()
    let orderedItems: OrderItemModel[] = []
    const setOrderItems = jest.fn()
    const setOrdersList = jest.fn()
    let orderedMenuItems: MenuItemModel[] = []
    let clientsList = db['users']
    const setFilteredMenuItems = jest.fn()
    const sortMenuItemsByPrice = (ascending: boolean) => jest.fn()
    const setClientsList = jest.fn()
    const filterMenuItems = (filterBy: string) => jest.fn()
    let ordersList: OrderModel[] = []
    let currentFilter = ""
    let currentSorting = ""
    const setIsSnackbarVisible = jest.fn()
    const isSnackbarVisible = false
    const setIsModalOpen = jest.fn()
    let isModalOpen = false
    let currentlySelectedMenuItem = allMenuItems[0]
    const setCurrentlySelectedMenuItem = jest.fn()
    let isExtended = false
    const setIsExtended = jest.fn()
    const setOrderedMenuItems = jest.fn()
    const setSearchQuery = jest.fn()

    return {
        allMenuItems,
        setMenuItems,
        filteredMenuItems,
        orderedItems,
        increaseOrderItemQuantity,
        reduceOrderItemQuantity,
        removeOrderItem,
        setOrderItems,
        setOrdersList,
        orderedMenuItems,
        clientsList,
        setFilteredMenuItems,
        sortMenuItemsByPrice,
        setClientsList,
        filterMenuItems,
        ordersList,
        currentFilter,
        currentSorting,
        setIsSnackbarVisible,
        isSnackbarVisible,
        setIsModalOpen,
        isModalOpen,
        currentlySelectedMenuItem,
        setCurrentlySelectedMenuItem,
        isExtended,
        setIsExtended,
        setOrderedMenuItems,
        setSearchQuery
    }
}