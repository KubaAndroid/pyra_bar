import { FC, PropsWithChildren } from "react"
import { BrowserRouter } from "react-router-dom"
import { OrderedItemsProvider } from "../context/ShopContext"

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

export default Wrapper