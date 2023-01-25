import OrderItemModel from '../../models/OrderItemModel';
import { useOrderContext } from '../../context/ShopContext';
import trash from '../../assets/img/trash-can.png'
import styled from 'styled-components';
import { BuyButton } from '../menu/MenuItemLayout';

const OrderItemContainer = styled.div`
  width: 100%;
  border-radius: 6px;
  margin: 20px auto 0 auto;
  padding: 10px 20px;
  border: 1px solid #c5bcae;
  border-radius: 14px;
`

const ContainerTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: left;
`

const OrderName = styled.p`
  font-size: 18px;
  font-weight: 500;
`
const OrderQuantity = styled.p`
  font-size: 14px;
  font-weight: 400;
`
const RightPart = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  text-align: center;
  margin-right: 1.5em;
  align-items: center;
`
const RightPartRow = styled.div`
  display: flex;
  flex-direction: row;
  margin-right: 1.5em;
`
const OrderAmount = styled.div`
  margin: 1rem;
`
const StylishTrash = styled.img`
  height: 40px;
`
type OrderType = {
  item: OrderItemModel;
}

function OrderItem({ item }: OrderType) {
  
  const {
    increaseOrderItemQuantity,
    reduceOrderItemQuantity,
    removeOrderItem
  } = useOrderContext()

  return (
    <>
      <OrderItemContainer>
        <ContainerTop>
          <div>
            <OrderName>{item.name}</OrderName>
            <OrderQuantity>
              Quantity: {item.quantity}
            </OrderQuantity>
            <OrderQuantity>
              Price total: {item.price.toFixed(2)}
            </OrderQuantity>
          </div>
          <RightPart>
            <RightPartRow>
              <BuyButton onClick={() => reduceOrderItemQuantity(item.id!)}>-</BuyButton>
              <OrderAmount>{item.quantity}</OrderAmount>
              <BuyButton onClick={() => increaseOrderItemQuantity(item.id!)} >+</BuyButton>
            </RightPartRow>
            <StylishTrash src={trash} alt="" onClick={() => removeOrderItem(item.id!)} />
          </RightPart>
        </ContainerTop>
      </OrderItemContainer>
    </>
  )
}

export default OrderItem