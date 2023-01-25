import { createContext, FC, PropsWithChildren, ReactNode } from "react"
import { BrowserRouter } from "react-router-dom"
import { OrderedItemsProvider, OrderedItemsContext } from "../context/ShopContext"
import { CreateMockContext, MockOrderedItemsProvider } from "./ShopContextMock"
import MenuItemModel from "../models/MenuItemModel"
import db from '../../db.json'
import OrderItemModel from "../models/OrderItemModel"
import OrderModel from "../models/OrderModel"
import ClientModel from "../models/ClientModel"
import UserOrdersModel from "../models/UserOrdersModel"

type WrapperProps = PropsWithChildren<{}>

const Wrapper: FC<WrapperProps> = ({ children }) => {
    return (
      <OrderedItemsProvider>
          <BrowserRouter>
              {children}
          </BrowserRouter>
      </OrderedItemsProvider>
  )
}


export interface MockOrderedItemsContext {
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

export const CreateMockContextTest = createContext({} as MockOrderedItemsContext)

export const MockWrapper: FC<MockContextProviderProps> = ({ children }) => {
    let allMenuItems: MenuItemModel[] = db['menuItems']
    let filteredMenuItems: MenuItemModel[] = allMenuItems
    const getOrderItemQuantity = jest.fn()
    const increaseOrderItemQuantity = jest.fn()
    const reduceOrderItemQuantity = jest.fn()
    const removeOrderItem = jest.fn()
    let orderQuantity = 0
    let orderedItems: OrderItemModel[] = []
    const setOrderItems = (items: OrderItemModel[]) => orderedItems = items
    const setOrdersList = jest.fn()
    let orderedMenuItems: MenuItemModel[] = [allMenuItems[3]]
    const getAllMenuItems = () => allMenuItems
    const clearOrder = () => orderedItems = []
    const getMenuItemById = (id: number) => allMenuItems.find(item => item.id === id)
    let clientsList = db['users']
    const getClientById = (id: number) => clientsList.find(user => user.id === id)!
    const setFilteredMenuItems = (items: MenuItemModel[]) => filteredMenuItems = items
    const sortMenuItemsByPrice = (ascending: boolean) => jest.fn()
    const setClientsList = jest.fn()
    const filterMenuItems = (filterBy: string) => jest.fn()
    const searchMenuItems = (searchQuery: string) => jest.fn()
    let ordersList: OrderModel[] = []
    const getAllOrders = () => db['orders']
    let currentFilter = ""
    let currentSorting = ""

    return (
        <CreateMockContextTest.Provider
            value={{
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
                currentSorting
            }}
        >
          <BrowserRouter>
              {children}
          </BrowserRouter>
      </CreateMockContextTest.Provider>
  )
}

export default Wrapper









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
    let orderedMenuItems: MenuItemModel[] = [allMenuItems[3]]
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
        postOrder
    }
}