import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from 'react'
import MenuItemModel from '../models/MenuItemModel'
import OrderModel from "../models/OrderModel";
import ClientModel from "../models/ClientModel";
import OrderItemModel from '../models/OrderItemModel';


type OrderedItemsContext = {
    getOrderItemQuantity: (id: number) => number
    increaseOrderItemQuantity: (id: number) => void
    reduceOrderItemQuantity: (id: number) => void
    removeOrderItem: (id: number) => void
    orderQuantity: number

    orderedItems: OrderItemModel[]
    setOrderItems: React.Dispatch<React.SetStateAction<OrderItemModel[]>>


    setOrdersList: React.Dispatch<React.SetStateAction<OrderModel[]>>
    orderedMenuItems: MenuItemModel[]
    getAllMenuItems: () => Promise<MenuItemModel[]>
    clearOrder: () => void
    getMenuItemById: (id: number) => MenuItemModel | undefined
    getClientById: (id: number) => ClientModel
    allMenuItems: MenuItemModel[]
    filteredMenuItems: MenuItemModel[]
    setFilteredMenuItems: React.Dispatch<React.SetStateAction<MenuItemModel[]>>
    sortMenuItemsByPrice: (ascending: boolean) => void
    clientsList: ClientModel[]
    setClientsList: React.Dispatch<React.SetStateAction<ClientModel[]>>
    filterMenuItems: (filterBy: string) => void
    searchMenuItems: (searchQuery: string) => void
    ordersList: OrderModel[]
    getAllOrders: () => Promise<OrderModel[]>
    currentFilter: string
    currentSorting: string
}

const CreateOrderedItemsContext = createContext({} as OrderedItemsContext)

export function useOrderContext() {
    return useContext(CreateOrderedItemsContext)
}

type ContextProviderProps = {
    children: ReactNode
}

export function OrderedItemsProvider({ children }: ContextProviderProps) {
    const [orderedItems, setOrderItems] = useState<OrderItemModel[]>([])

    const [orderedMenuItems, setOrderedMenuItems] = useState<MenuItemModel[]>([])
    const [allMenuItems, setMenuItems] = useState<MenuItemModel[]>([]);
    const [filteredMenuItems, setFilteredMenuItems] = useState<MenuItemModel[]>([]);

    const [currentFilter, setCurrentFilter] = useState<string>("")
    const [searchQuery, setSearchQuery] = useState<string>("")
    const [currentSorting, setCurrentSorting] = useState<string>("")

    const [ordersList, setOrdersList] = useState<OrderModel[]>([])

    const [clientsList, setClientsList] = useState<ClientModel[]>([])

    const [, updateState] = useState<object>({});
    const forceUpdate = useCallback(() => updateState({}), []);

    useEffect(() => {
        const getOrders = async () => {
            const fetchedOrders = await fetchOrders()
            setOrdersList(fetchedOrders)
        }
        const getClients = async () => {
            const fetchedClients = await fetchClients()
            setClientsList(fetchedClients)
            
        }
        // getAllMenuItems()
        getOrders()
        getClients()
    }, [])

    const fetchMenuItems = async () => {
        const res = await fetch('http://localhost:5000/menuItems')
        const data = await res.json()
        return data
    }

    const fetchOrders = async() => {
        const res = await fetch('http://localhost:5000/orders')
        const data = await res.json()
        return data
    }

    const fetchClients = async() => {
        const res = await fetch('http://localhost:5000/users')
        const data = await res.json()
        return data
    }

    const getAllMenuItems = async (): Promise<MenuItemModel[]> => {
        if (allMenuItems.length < 1) {
            const fetchedMenuItems = await fetchMenuItems()
            setMenuItems(fetchedMenuItems.sort((a: MenuItemModel, b: MenuItemModel) => a.name > b.name ? 1 : -1))
            setFilteredMenuItems(fetchedMenuItems.sort((a: MenuItemModel, b: MenuItemModel) => a.name > b.name ? 1 : -1))
            return fetchedMenuItems.sort((a: MenuItemModel, b: MenuItemModel) => a.name > b.name ? 1 : -1)
        }
        return allMenuItems
    }

    const getAllOrders = async ():Promise<OrderModel[]> => {
        if (ordersList.length < 1) {
            const fetchedOrders = await fetchOrders()
            setOrdersList(fetchedOrders)
            console.log(fetchedOrders)
            return fetchedOrders as OrderModel[]
        }
        return ordersList as OrderModel[]
    }

    function sortMenuItemsByPrice(ascending: Boolean): void {
        if (ascending) {
            const sortedByPriceAsc = filteredMenuItems.sort((a: MenuItemModel, b: MenuItemModel) => a.price > b.price ? 1 : -1)
            setFilteredMenuItems(sortedByPriceAsc)
            setCurrentSorting("asc")
            forceUpdate()
        } else {
            const sortedByPriceDesc = filteredMenuItems.sort((a: MenuItemModel, b: MenuItemModel) => a.price < b.price ? 1 : -1)
            setFilteredMenuItems(sortedByPriceDesc)
             setCurrentSorting("desc")
            forceUpdate()
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
        setOrderItems(currentItems => {
            if (currentItems.find(item => item.id === id) == null) {
                return [...orderedItems, {id, quantity: 1, price: newMenuItem.price, name: newMenuItem.name}]
            } else {
                return currentItems.map(item => {
                    if (item.id === id) {
                        return {...item, quantity: item.quantity + 1, price: item.price + newMenuItem.price}
                    } else {
                        return item
                    }
                })
            }
        })
    }

    function reduceOrderItemQuantity(id: number) {
         const newMenuItem = getMenuItemById(id)!
        setOrderItems(currentItems => {
            if (currentItems.find(item => item.id === id)?.quantity === 1) {
                return currentItems.filter(item => item.id !== id)
            } else {
                return currentItems.map(item => {
                    if (item.id === id) {
                        return {...item, quantity: item.quantity - 1, price: item.price - newMenuItem.price}
                    } else {
                        return item
                    }
                })
            }
        })
    }

    function removeOrderItem(id: number) {
        setOrderedMenuItems(currentItems => {
            return currentItems.filter(item => item.id !== id)
        })
        setOrderItems(currentItems => {
            return currentItems.filter(item => item.id !== id)
        })
    }

    return (
        <CreateOrderedItemsContext.Provider
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
        </CreateOrderedItemsContext.Provider>
    )

}