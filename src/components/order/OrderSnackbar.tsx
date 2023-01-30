import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { useOrderContext } from "../../context/ShopContext";
import { clearOrder } from "../../utils";

const Message = styled.div`
  flex: 80%;
  font-weight: bold;
`

const OkButton = styled.button`
  margin: 15px;
  cursor: pointer;
  background-color: transparent;
  border: 1px solid #c0dbcc;
  border-radius: 6px;
  padding: 6px;
  &:hover {
    background-color: #f0ebe5;
  }
`

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  25% {
    opacity: 0.6;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
`

const SnackbarLayout = styled.div`
  position: fixed;
  z-index: 1000;
  bottom: 0rem;
  left: 50%;
  transform: translateX(-50%);
  height: auto;
  border: 1px solid #b4d6a5;
  background-color: #a2cc8e;
  padding: 8px;
  padding-left: 50px;
  padding-right: 50px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  animation-name: ${fadeIn};
  animation-duration: 3s;
`

const OrderSnackbar = () => {
  const navigate = useNavigate();
  const {
    setOrderItems, setOrderedMenuItems
  } = useOrderContext()
  return (
    <SnackbarLayout>
      <Message>The order has been placed!
        <OkButton
          onClick={() => {
            clearOrder(setOrderItems, setOrderedMenuItems);
            navigate('/', { replace: true });
          }}>OK
        </OkButton>
      </Message>
    </SnackbarLayout>
  );
}

export default OrderSnackbar;
