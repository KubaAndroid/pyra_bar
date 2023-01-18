import MenuItemModel from '../../models/MenuItemModel'
import { useOrderContext } from '../../context/ShopContext';
import fireIcon from '../../assets/img/fire.png';
import vegeIcon from '../../assets/img/plant.png';
import noLactoseIcon from '../../assets/img/vegan.png';
import allCategoriesIcon from '../../assets/img/food.png';
import styled from 'styled-components';
import { CategoryIcon } from '../../pages/MenuPage';


interface MenuItemType {
    menuItem: MenuItemModel,
    index: number,
    setIsModalOpen: React.Dispatch<React.SetStateAction<Boolean>>,
    setCurrentItem: React.Dispatch<React.SetStateAction<MenuItemModel>>
}

const MenuItemCard = styled.li`
  display: flex;
  flex-direction: column;
  width: 45%;
  background-color: #EBE8E0;
  border-radius: 36px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  margin: 1rem 1rem 1.5rem;
`

const MenuItemCardImgDiv = styled.div`
  width: 100%;
  /* height: 22rem; */
  overflow: hidden;
  border-radius: 26px 26px 0 0;
`
const MenuItemCardImg = styled.img`
  width: 100%;
  object-fit: cover;
  height: 350px;
`
const MenuItemCardContent = styled.div`
  text-align: center;
  /* padding: 1rem; */
`

const InfoButton = styled.button`
  cursor: pointer;
  color: #2c292b;
  border: 1px solid #2c292b;
  background-color: transparent;
  border-radius: 6px;
  padding: 5px;
  margin: 4px;
  &:hover {
    background-color: #f0ebe5;
  }
`
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
const MenuItemCardBottom = styled.div`
  padding: 1rem;
  text-align: center;
`

const MarginalizedDiv = styled.div`
    margin: 6px;
`

function MenuItemLayout({ menuItem, index, setIsModalOpen, setCurrentItem }: MenuItemType) {
    const {
        getOrderItemQuantity,
        increaseOrderItemQuantity,
        reduceOrderItemQuantity,
    } = useOrderContext()
    const quantity = getOrderItemQuantity(menuItem.id)
    const selectedIcon = (dishType: String) => {
        if (dishType === 'vege') {
            return vegeIcon
        } else if (dishType === 'spicy') {
            return fireIcon
        } else if (dishType === 'lactoseFree'){
            return noLactoseIcon
        } else {
            return allCategoriesIcon
        }
    }
    const myIcon = selectedIcon(menuItem.category)

    return (
        <>
            <MenuItemCard>
                <MenuItemCardImgDiv>
                    <MenuItemCardImg src={menuItem.imgUrl} alt="good food!" />
                </MenuItemCardImgDiv>
                <MenuItemCardContent>
                    <h3>{menuItem.name} <CategoryIcon src={myIcon} alt="food category" /></h3>
                    <InfoButton
                        onClick={() => {
                          setCurrentItem(menuItem)            
                          setIsModalOpen(true)
                        }}>Info</InfoButton>
                    {index < 4 ? <MarginalizedDiv>{menuItem.description}</MarginalizedDiv> : null}
                    <MarginalizedDiv>Price: { menuItem.price.toFixed(2)}</MarginalizedDiv>
                </MenuItemCardContent>
                <MenuItemCardBottom>
                    {quantity === 0 ? (
                        <div>
                            <BuyButton onClick={() => increaseOrderItemQuantity(menuItem.id)}>Buy!</BuyButton>
                        </div>
                    ) : (
                            <div>
                                <BuyButton onClick={() => reduceOrderItemQuantity(menuItem.id)}>-</BuyButton>
                                <BuyButton>{quantity}</BuyButton>
                                <BuyButton onClick={() => increaseOrderItemQuantity(menuItem.id)}>+</BuyButton>
                            </div>
                    )}
                </MenuItemCardBottom>
            </MenuItemCard>
    </>
  )
}

export default MenuItemLayout