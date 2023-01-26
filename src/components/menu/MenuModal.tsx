import React from 'react'
import styled from 'styled-components'
import MenuItemModel from '../../models/MenuItemModel'
import { useOrderContext } from '../../context/ShopContext'

type ModalType = {
    openedModal: Function
    menuItem: MenuItemModel
}

export const BuyButton = styled.button`
  font: inherit;
  cursor: pointer;
  color: #2c292b;
  border: 1px solid #2c292b;
  background-color: transparent;
  padding: 0.5rem 1.5rem;
  border-radius: 10px;
  margin: 1px;
  transition: all 0.2s ease 0s;
  &:hover {
    background-color: #f0ebe5;
  }
`

const ModalBackground = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(44, 44, 44, 0.8);
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
  min-height: 80%;
  border-radius: 12px;
  background-color: #EBE8E0;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  padding: 25px;
`

const CloseDiv = styled.div`
  display: flex;
  justify-content: flex-end;
`

const CloseButton = styled.button`
  background-color: transparent;
  border: none;
  font-size: 30px;
  padding: 8px;
  border-radius: 8px;
  cursor: pointer;
  &:hover {
    background-color: #f0ebe5;
  }
`

const TitleDiv = styled.div`
  display: inline-block;
  text-align: center;
  margin-top: 10px;
`

const DescriptionDiv = styled.div`
  flex: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.4rem;
  text-align: center;
`

const BottomDiv = styled.div`
  flex: 20%;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  margin: auto;
`



function MenuModal({ openedModal }: ModalType) {
  const {
        getOrderItemQuantity,
        increaseOrderItemQuantity,
    reduceOrderItemQuantity,
        currentlySelectedMenuItem
  } = useOrderContext()
  
  const quantity = getOrderItemQuantity(currentlySelectedMenuItem!.id)!

  return (
      <ModalBackground>
      <ModalContainer>
        <CloseDiv>
          <CloseButton onClick={() => openedModal(false)}> X </CloseButton>
        </CloseDiv>
        <TitleDiv>
          <h1>{currentlySelectedMenuItem!.name}</h1>
        </TitleDiv>
        <DescriptionDiv>
          {currentlySelectedMenuItem.description}
        </DescriptionDiv>
        <BottomDiv>
          {quantity === 0 ? (
            <div >
                <BuyButton onClick={() => increaseOrderItemQuantity(currentlySelectedMenuItem!.id)}>Buy</BuyButton>
            </div>
          ) : (
              <div >
                  <BuyButton onClick={() => reduceOrderItemQuantity(currentlySelectedMenuItem!.id)}>-</BuyButton>
                  <BuyButton>{quantity}</BuyButton>
                  <BuyButton onClick={() => increaseOrderItemQuantity(currentlySelectedMenuItem!.id)}>+</BuyButton>
              </div>
          )}
        </BottomDiv>
      </ModalContainer>
    </ModalBackground>
  )
}

export default MenuModal