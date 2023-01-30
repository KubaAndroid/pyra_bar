import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from 'react'
import MenuItemModel from '../models/MenuItemModel'
import OrderModel from "../models/OrderModel";
import ClientModel from "../models/ClientModel";
import OrderItemModel from '../models/OrderItemModel';
import { fetchClients, fetchMenuItems, fetchOrders, getMenuItemById, getOrderQuantity } from '../utils';

export interface OrderedItemsContext {
    increaseOrderItemQuantity: (id: number) => void
    reduceOrderItemQuantity: (id: number) => void
    removeOrderItem: (id: number) => void
    orderedItems: OrderItemModel[]
    setOrderItems: React.Dispatch<React.SetStateAction<OrderItemModel[]>>
    setOrderedMenuItems: (value: React.SetStateAction<MenuItemModel[]>) => void
    setOrdersList: React.Dispatch<React.SetStateAction<OrderModel[]>>
    orderedMenuItems: MenuItemModel[]
    // clearOrder: () => void
    // getMenuItemById: (id: number, items: MenuItemModel[]) => MenuItemModel | undefined
    allMenuItems: MenuItemModel[]
    setMenuItems: React.Dispatch<React.SetStateAction<MenuItemModel[]>>
    filteredMenuItems: MenuItemModel[]
    setFilteredMenuItems: React.Dispatch<React.SetStateAction<MenuItemModel[]>>
    sortMenuItemsByPrice: (ascending: boolean) => void
    clientsList: ClientModel[]
    setClientsList: React.Dispatch<React.SetStateAction<ClientModel[]>>
    filterMenuItems: (filterBy: string) => void
    searchMenuItems: (searchQuery: string) => void
    ordersList: OrderModel[]
    currentFilter: string
    currentSorting: string
    setIsSnackbarVisible: React.Dispatch<React.SetStateAction<Boolean>>
    isSnackbarVisible: Boolean
    setIsModalOpen: React.Dispatch<React.SetStateAction<Boolean>>
    isModalOpen: Boolean
    currentlySelectedMenuItem: MenuItemModel
    setCurrentlySelectedMenuItem: React.Dispatch<React.SetStateAction<MenuItemModel>>
    isExtended: Boolean
    setIsExtended: React.Dispatch<React.SetStateAction<Boolean>>
}

export const CreateOrderedItemsContext = createContext({} as OrderedItemsContext)

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
    const [isSnackbarVisible, setIsSnackbarVisible] = useState<Boolean>(false)
    const [isModalOpen, setIsModalOpen] = useState<Boolean>(false)
    const [currentlySelectedMenuItem, setCurrentlySelectedMenuItem] = useState<MenuItemModel>(filteredMenuItems[0]);
    const [, updateState] = useState<object>({});
    const forceUpdate = useCallback(() => updateState({}), []);
    const [isExtended, setIsExtended] = useState<Boolean>(false);

    useEffect(() => {
        const getOrders = async () => {
            const fetchedOrders = await fetchOrders()
            setOrdersList(fetchedOrders)
        }
        const getClients = async () => {
            const fetchedClients = await fetchClients()
            setClientsList(fetchedClients)
            
        }
        getOrders()
        getClients()
    }, []);


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
        const newMenuItem = getMenuItemById(id, allMenuItems)!
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
         const newMenuItem = getMenuItemById(id, allMenuItems)!
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
                increaseOrderItemQuantity,
                reduceOrderItemQuantity,
                removeOrderItem,
                orderedItems,
                setOrderItems,
                setOrdersList,
                orderedMenuItems,
                // clearOrder,
                // getMenuItemById,
                allMenuItems,
                setMenuItems,
                filteredMenuItems,
                setFilteredMenuItems,
                sortMenuItemsByPrice,
                clientsList,
                setClientsList,
                filterMenuItems,
                searchMenuItems,
                ordersList,
                currentFilter,
                currentSorting,
                isSnackbarVisible,
                setIsSnackbarVisible,
                setIsModalOpen,
                isModalOpen,
                currentlySelectedMenuItem,
                setCurrentlySelectedMenuItem,
                isExtended,
                setIsExtended,
                setOrderedMenuItems
            }}>
            {children}
        </CreateOrderedItemsContext.Provider>
    )

}