import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from 'react-router-dom';
import Header from "./components/header/Header";
import { OrderedItemsProvider } from "./context/ShopContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <OrderedItemsProvider>
      <App />
    </OrderedItemsProvider>
  </React.StrictMode>
);
