import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useOrderContext } from '../../context/ShopContext'
import OrdersListItem from './OrdersListItem'

const OrdersContainer = styled.div`
    display: flex;
    height: 100%;
    width: 80%;
    margin-left: 10%;
    background-color: #dbd5cc;
    border-radius: 16px 16px 0 0;
    padding: 2%;
    flex-direction: column;
    justify-content: space-around;
    align-content: center;
    padding-top: 120px;
`

function OrdersList() {
    const { getAllOrders, ordersList, getAllMenuItems } = useOrderContext()
    
    useEffect(() => {
        const getOrders = async () => {
          await getAllOrders()
          await getAllMenuItems()
        }
        getOrders()
    }, [])

  return (
      <OrdersContainer>
          {ordersList.map((order, index) => {
            return <OrdersListItem key={index} order={order} />
          })}
      </OrdersContainer>
    )
  // )
}

export default OrdersList