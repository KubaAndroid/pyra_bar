import React from "react";
import GlobalStyle from './GlobalStyle';
import MenuPage from "./pages/MenuPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import OrderPage from "./pages/OrderPage";
import OrdersListPage from "./pages/OrdersListPage";
import ContactPage from "./pages/ContactPage";
import OrderConfirmationPage from "./pages/OrderConfirmationPage";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import { useOrderContext } from "./context/ShopContext";
import { getOrderQuantity } from "./utils";

function App() {
  // const { orderQuantity, orderedItems } = useOrderContext()
  const { orderedItems } = useOrderContext()
  const quantity = getOrderQuantity(orderedItems)
  
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Header orderQuantity={ quantity } />
        <Routes>
          <Route path='/' element={<MenuPage />} />
          <Route path='/order' element={<OrderPage orderedItems={orderedItems} />} />
          <Route path='/orderslist' element={<OrdersListPage />} />
          <Route path='/contact' element={<ContactPage />} />
          <Route path='/orderConfirm' element={<OrderConfirmationPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
