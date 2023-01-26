import React from 'react'
import styled from 'styled-components'
import MenuItemModel from '../../models/MenuItemModel'
import MenuItemLayout from './MenuItemLayout'

const StyledMenuList = styled.div`
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`

interface MenuType {
  items: MenuItemModel[],
  setIsModalOpen: React.Dispatch<React.SetStateAction<Boolean>>
  setCurrentItem: React.Dispatch<React.SetStateAction<MenuItemModel>>
}

function MenuList({ items, setIsModalOpen, setCurrentItem }: MenuType) {


  return (
    <StyledMenuList>
      {items.map((item, index) =>
        <MenuItemLayout
          key={item.id}
          menuItem={item}
          index={index}
          // setIsModalOpen={setIsModalOpen}
          // setCurrentItem={setCurrentItem}
      />)}
    </StyledMenuList>
  )
}

export default MenuList