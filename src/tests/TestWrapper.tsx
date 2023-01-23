import { createContext, FC, PropsWithChildren, ReactNode } from "react"
import { BrowserRouter } from "react-router-dom"
import { OrderedItemsProvider } from "../context/ShopContext"
import { CreateMockContext, MockOrderedItemsProvider } from "../context/ShopContextMock"
import MenuItemModel from "../models/MenuItemModel"
import db from '../../db.json'
import OrderItemModel from "../models/OrderItemModel"


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


type MockOrderedItemsContext = {
    getOrderItemQuantity: (id: number) => number
    allMenuItems: MenuItemModel[]
    filteredMenuItems: MenuItemModel[]
    getMenuItemById: (id: number) => MenuItemModel
    orderedItems: OrderItemModel[]

}
type MockContextProviderProps = {
    children: ReactNode
}

export const CreateMockContextTest = createContext({} as MockOrderedItemsContext)

export const MockWrapper: FC<MockContextProviderProps> = ({ children }) => {
    let allMenuItems: MenuItemModel[] = db['menuItems']
    let filteredMenuItems: MenuItemModel[] = allMenuItems
    let orderedItems: OrderItemModel[] = []
    
    const getOrderItemQuantity = (id: number) => {
        return orderedItems.find(item => item.id === id)?.quantity || 0
    }
    const getMenuItemById = (id: number) => {
        return allMenuItems.find(item => item.id === id)!
    }
    

    return (
        <CreateMockContextTest.Provider
            value={{
                getOrderItemQuantity,
                allMenuItems,
                filteredMenuItems,
                getMenuItemById,
                orderedItems
            }}
        >
          <BrowserRouter>
              {children}
          </BrowserRouter>
      </CreateMockContextTest.Provider>
  )
}

export default Wrapper