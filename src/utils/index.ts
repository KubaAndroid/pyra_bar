import ClientModel from "../models/ClientModel"
import MenuItemModel from "../models/MenuItemModel"
import OrderItemModel from "../models/OrderItemModel"
import OrderModel from "../models/OrderModel"
import UserOrdersModel from "../models/UserOrdersModel"

export const fetchMenuItems = async () => {
    const res = await fetch('http://localhost:5000/menuItems')
    const data = await res.json()
    return data
}

export const fetchOrders = async() => {
    const res = await fetch('http://localhost:5000/orders')
    const data = await res.json()
    return data
}

export const fetchClients = async() => {
    const res = await fetch('http://localhost:5000/users')
    const data = await res.json()
    return data
}

export function getMenuItemById(id: number, menuItems: MenuItemModel[]) {
    return menuItems.find(item => item.id === id)
}

export async function saveUser(
    user: ClientModel, 
    clientsList: ClientModel[],
    setClientsList: (value: React.SetStateAction<ClientModel[]>) => void
) {
    await fetch('http://localhost:5000/users', {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
        "Content-Type": "application/json"
    }
    }).then(() => setClientsList([...clientsList, user]))
}

export async function postOrder(order: UserOrdersModel, setIsSnackbarVisible: (value: React.SetStateAction<Boolean>) => void) {
    await fetch('http://localhost:5000/orders', {
        method: "POST",
        body: JSON.stringify(order),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(() => {
        setIsSnackbarVisible(true)
    })
}

export const getOrderQuantity = (orderedItems: OrderItemModel[]) => orderedItems?.reduce((quantity, item) => item.quantity + quantity, 0)

export function getOrderItemQuantity(id: number, orderedItems: OrderItemModel[]) {
    return orderedItems.find(item => item.id === id)?.quantity || 0
}

export const getClientById = (id: number, clientsList: ClientModel[]) => {
    return clientsList.find(user => user.id === id)!
}


export const getAllMenuItems = async (
    allMenuItems: MenuItemModel[],
    setMenuItems: (value: React.SetStateAction<MenuItemModel[]>) => void,
    setFilteredMenuItems: (value: React.SetStateAction<MenuItemModel[]>) => void
): Promise<MenuItemModel[]> => {
    if (allMenuItems.length < 1) {
        const fetchedMenuItems = await fetchMenuItems()
        setMenuItems(fetchedMenuItems.sort((a: MenuItemModel, b: MenuItemModel) => a.name > b.name ? 1 : -1))
        setFilteredMenuItems(fetchedMenuItems.sort((a: MenuItemModel, b: MenuItemModel) => a.name > b.name ? 1 : -1))
        return fetchedMenuItems.sort((a: MenuItemModel, b: MenuItemModel) => a.name > b.name ? 1 : -1)
    }
    return allMenuItems as MenuItemModel[]
}

export const getAllOrders = async (setOrdersList: (value: React.SetStateAction<OrderModel[]>) => void):Promise<OrderModel[]> => {
    const fetchedOrders = await fetchOrders()
    setOrdersList(fetchedOrders.sort((a: MenuItemModel, b: MenuItemModel) => a.name > b.name ? 1 : -1))
    return fetchedOrders as OrderModel[]
}

export function clearOrder(
    setOrderItems: (value: React.SetStateAction<OrderItemModel[]>) => void,
    setOrderedMenuItems: (value: React.SetStateAction<MenuItemModel[]>) => void
) {
    setOrderItems([]);
    setOrderedMenuItems([]);
}

export const searchMenuItems = (
    query: string, 
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>,
    allMenuItems: MenuItemModel[],
    currentFilter: string,
    setFilteredMenuItems: React.Dispatch<React.SetStateAction<MenuItemModel[]>>
) => {
    setSearchQuery(query.toLowerCase())
     setTimeout(() => {
        let queriedItems = allMenuItems.filter(item => item.name.toLowerCase().includes(query.toLowerCase())
        && item.category.includes(currentFilter))
        setFilteredMenuItems(queriedItems)
    }, 1000);
}