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
  items: MenuItemModel[]
}

function MenuList({ items }: MenuType) {
  return (
    <StyledMenuList>
      {items.map((item, index) =>
        <MenuItemLayout
          key={item.id}
          menuItem={item}
          index={index}
      />)}
    </StyledMenuList>
  )
}

export default MenuList