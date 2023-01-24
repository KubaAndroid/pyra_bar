import { Link } from "react-router-dom";
import OrderItem from "../components/order/OrderItem";
import { useOrderContext } from '../context/ShopContext';
import styled from "styled-components";
import { BuyButton } from "../components/menu/MenuItemView";
import OrderItemModel from "../models/OrderItemModel";


const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  margin: auto;
  height: 100%;
  width: 80%;
  background-color: #dbd5cc;
  border-radius: 16px 16px 0 0;
  padding: 2%;
  padding-top: 150px;
`

const CartEmpty = styled.div`
  margin: auto;
`

const SumTotalDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin: 15px;
  font-size: 20px;
`

const ConfirmOrderDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 15px;
  font-size: 20px;
`

type OrderPageProps = {
  orderedItems: OrderItemModel[]
}

const OrderPage = ({orderedItems}: OrderPageProps) => {
  let sumTotal = orderedItems?.reduce((sum, item) => {
    return sum + item.price;
  }, 0)

  return (
    <>
      <Container>
        {orderedItems?.length < 1 && <CartEmpty>Cart is empty</CartEmpty>}
        {orderedItems?.map((item) => {
          return (
            <OrderItem key={item.id} item={item} />
          )
        })}
        {orderedItems?.length > 0 &&
          <>
          <SumTotalDiv>Sum total: {sumTotal.toFixed(2)}</SumTotalDiv>
          <ConfirmOrderDiv>
            <Link to='/orderConfirm'><BuyButton>Confirm</BuyButton></Link>
          </ConfirmOrderDiv>
        </>}
      </Container>

      </>  
  )
}

export default OrderPage