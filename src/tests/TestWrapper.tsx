import { FC, PropsWithChildren } from "react"
import { BrowserRouter } from "react-router-dom"
import { OrderedItemsProvider } from "../context/ShopContext"
import { CreateMockContext, MockOrderedItemsProvider } from "../context/ShopContextMock"

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

export const MockWrapper: FC<WrapperProps> = ({ children }) => {
    return (
      <MockOrderedItemsProvider>
          <BrowserRouter>
              {children}
          </BrowserRouter>
      </MockOrderedItemsProvider>
  )
}

export default Wrapper