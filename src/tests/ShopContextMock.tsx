import { createContext, ReactNode } from "react"
import ClientModel from "../models/ClientModel"
import MenuItemModel from "../models/MenuItemModel"
import OrderItemModel from "../models/OrderItemModel"
import OrderModel from "../models/OrderModel"
import db from '../../db.json'
import UserOrdersModel from "../models/UserOrdersModel"

type MockOrderedItemsContext = {
    getOrderItemQuantity: (id: number) => number
    increaseOrderItemQuantity: (id: number) => void
    reduceOrderItemQuantity: (id: number) => void
    removeOrderItem: (id: number) => void
    orderQuantity: number
    orderedItems: OrderItemModel[]
    setOrderItems: (item: OrderItemModel[]) => OrderItemModel[]
    setOrdersList: (items: OrderModel[]) => void
    orderedMenuItems: MenuItemModel[]
    getAllMenuItems: () => MenuItemModel[]
    clearOrder: () => void
    getMenuItemById: (id: number) => MenuItemModel | undefined
    getClientById: (id: number) => ClientModel
    allMenuItems: MenuItemModel[]
    filteredMenuItems: MenuItemModel[]
    setFilteredMenuItems: (items: MenuItemModel[]) => void
    sortMenuItemsByPrice: (ascending: boolean) => void
    clientsList: ClientModel[]
    setClientsList: (items: ClientModel[]) => void
    filterMenuItems: (filterBy: string) => void
    searchMenuItems: (searchQuery: string) => void
    ordersList: OrderModel[]
    getAllOrders: () => UserOrdersModel[]
    currentFilter: string
    currentSorting: string
}

type MockContextProviderProps = {
    children: ReactNode
}

export const CreateMockContext = createContext({} as MockOrderedItemsContext)

export function MockOrderedItemsProvider({ children }: MockContextProviderProps) {

    let orderedItems: OrderItemModel[] = []
    const setOrderItems = (model: OrderItemModel[]) => orderedItems = model

    let orderedMenuItems: MenuItemModel[] = []
    const setOrderedMenuItems = (model: MenuItemModel[]) => orderedMenuItems = model

    let allMenuItems: MenuItemModel[] = db['menuItems']
    const setMenuItems = (model: MenuItemModel[]) => allMenuItems = model

    let filteredMenuItems: MenuItemModel[] = allMenuItems
    const setFilteredMenuItems = (model: MenuItemModel[]) => filteredMenuItems = model

    let currentFilter: string = ""
    const setCurrentFilter = (filter: string) => currentFilter = filter

    let searchQuery: string = ""
    const setSearchQuery = (query: string) => searchQuery = query

    let currentSorting: string = ""
    const setCurrentSorting = (sort: string) => currentSorting = sort

    let ordersList: OrderModel[] = []
    const setOrdersList = (orders: OrderModel[]) => ordersList = orders

    let fetchedUserOrders: UserOrdersModel[] = db['orders']
    const setFetchedUserOrders = (orders: UserOrdersModel[]) => fetchedUserOrders = [...orders]

    let clientsList: ClientModel[] = db["users"]
    const setClientsList = (clients: ClientModel[]) => clientsList = clients

    function sortMenuItemsByPrice(ascending: Boolean): void {
        if (ascending) {
            const sortedByPriceAsc = filteredMenuItems.sort((a: MenuItemModel, b: MenuItemModel) => a.price > b.price ? 1 : -1)
            setFilteredMenuItems(sortedByPriceAsc)
            setCurrentSorting("asc")
        } else {
            const sortedByPriceDesc = filteredMenuItems.sort((a: MenuItemModel, b: MenuItemModel) => a.price < b.price ? 1 : -1)
            setFilteredMenuItems(sortedByPriceDesc)
             setCurrentSorting("desc")
        }
    }

    const orderQuantity = orderedItems?.reduce((quantity, item) => item.quantity + quantity, 0)

    function clearOrder() {
        setOrderItems([]);
        setOrderedMenuItems([])
    }

    function getOrderItemQuantity(id: number) {
        return orderedItems.find(item => item.id === id)?.quantity || 0
    }

    function getMenuItemById(id: number) {
        return allMenuItems.find(item => item.id === id)
    }

    const getClientById = (id: number) => {
        return clientsList.find(user => user.id === id)!
    }

    function getOrderById(id: number) {
        return ordersList.find(order => order.id === id)
    }

    const filterMenuItems = (filterBy: string) => {
        if (filterBy === 'all') {
            setCurrentFilter('')
            let filteredItems = allMenuItems.filter(item => item.name.toLowerCase().includes(searchQuery))
            setFilteredMenuItems(filteredItems)
            return
        }
        setCurrentFilter(filterBy)
        const filteredResults = allMenuItems.filter(item => item.category.includes(filterBy) && 
            item.name.toLowerCase().includes(searchQuery))
        setFilteredMenuItems(filteredResults)
    }

    const searchMenuItems = (query: string) => {
        setSearchQuery(query.toLowerCase())
         setTimeout(() => {
            let queriedItems = allMenuItems.filter(item => item.name.toLowerCase().includes(query.toLowerCase())
            && item.category.includes(currentFilter))

        setFilteredMenuItems(queriedItems)
         }, 1000);
    }

    function increaseOrderItemQuantity(id: number) {
        const newMenuItem = getMenuItemById(id)!
        setOrderedMenuItems([...orderedMenuItems, newMenuItem!])
        if (orderedItems.find(item => item.id === id) == null) {
            setOrderItems([{ id, quantity: 1, price: newMenuItem.price, name: newMenuItem.name }])
        } else {
            let tempItem = orderedItems.find(item => item.id === id)!
            orderedItems = orderedItems.filter((el) => el.id !== id)
            tempItem.quantity = tempItem?.quantity + 1
            tempItem.price = tempItem.price + newMenuItem.price
            orderedItems.push(tempItem)
        }
    }


    function reduceOrderItemQuantity(id: number) {
        const newMenuItem = getMenuItemById(id)!
        if (orderedItems.find(item => item.id === id)?.quantity === 1) {
            orderedItems = orderedItems.filter(item => item.id !== id)
        } else {
            let tempItem = orderedItems.find(item => item.id === id)!
            tempItem.quantity = tempItem.quantity -1
            tempItem.price = tempItem.price - newMenuItem.price
            orderedItems.push(tempItem)
        }
    }

    function removeOrderItem(id: number) {
        orderedMenuItems = orderedMenuItems.filter(item => item.id !== id)
        orderedItems = orderedItems.filter(item => item.id !== id)
    }
    
    const getAllMenuItems = () => allMenuItems
    const getAllOrders = () => fetchedUserOrders

    return (
        <CreateMockContext.Provider
            value={{
                getOrderItemQuantity,
                increaseOrderItemQuantity,
                reduceOrderItemQuantity,
                removeOrderItem,
                orderedItems,
                setOrderItems,
                setOrdersList,
                orderQuantity,
                orderedMenuItems,
                getAllMenuItems,
                clearOrder,
                getMenuItemById,
                getClientById,
                allMenuItems,
                filteredMenuItems,
                setFilteredMenuItems,
                sortMenuItemsByPrice,
                clientsList,
                setClientsList,
                filterMenuItems,
                searchMenuItems,
                ordersList,
                getAllOrders,
                currentFilter,
                currentSorting
        }}>
            {children}
        </CreateMockContext.Provider>
    )

}

