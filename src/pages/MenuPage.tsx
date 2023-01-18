import styled from "styled-components"
import { useOrderContext } from "../context/ShopContext";
import fireIcon from '../assets/img/fire.png';
import vegeIcon from '../assets/img/plant.png';
import noLactoseIcon from '../assets/img/vegan.png';
import allCategoriesIcon from '../assets/img/food.png';
import { useEffect, useState } from "react";
import MenuItemModel from "../models/MenuItemModel";
import MenuModal from "../components/menu/MenuModal";
import MenuList from "../components/menu/MenuList";

interface IButtonProps {
  isActive?: boolean
}

const PageBackground = styled.div`
  width: 80%;
  margin-left: 10%;
  background-color: #dbd5cc;
  padding: 2%;
  padding-top: 110px;
`
export const H1 = styled.h1`
  text-align: center;
  font-size: 36px;
  margin: 10px;
`

const CategoryButtons = styled.div`
  padding: 12px;
  border-radius: 15px;
  display: flex;
  justify-content: space-between;
`

const CategoryButton = styled.button<IButtonProps>`
  margin: 0.3rem;
  background-color: ${props => props.isActive ? '#e4ded7' : '#dbd5cc'};
  cursor: pointer;
  color: #545041;
  border: 0px solid #e4ded7;
  padding: 0.5rem;
  border-radius: 4px;
  &:hover { 
    background-color: #e4ded7;
  }
`

const SearchInput = styled.input`
    border-radius: 8px;
    background-color: #e4ded7;
    padding: 4px;
    margin-left: 4px;
`

const IsLoading = styled.div`
width: 100%;
  margin: auto;
  display: flex;
  justify-content: center;
  margin-top: 30px;
`

export const CategoryIcon = styled.img`
  width: 25px;
`

const MenuCategory = {
    all: 'all',
    vege: 'vege',
    spicy: 'spicy',
    lactoseFree: 'lactoseFree'

}

const MenuPage = () => {
  const {
    getAllMenuItems,
    filteredMenuItems,
    setFilteredMenuItems,
    sortMenuItemsByPrice,
    filterMenuItems,
    searchMenuItems,
    currentFilter,
    currentSorting
  } = useOrderContext()

  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<Boolean>(false);
  const [currentlySelectedMenuItem, setCurrentlySelectedMenuItem] = useState<MenuItemModel>(filteredMenuItems[0]);

  useEffect(() => {
    const getMenuItems = async () => {
      const menuItems = await getAllMenuItems()
      setFilteredMenuItems(menuItems)
      setIsLoading(false)
    }
    getMenuItems()
  }, [])
  
  
  if (isLoading) {
    return (
      <PageBackground>
        <IsLoading>Loading...</IsLoading>
      </PageBackground>
    )
  }
  else {
    return (
      <>
        {isModalOpen ? (<MenuModal menuItem={currentlySelectedMenuItem} openedModal={setIsModalOpen} />) : (
          <PageBackground>
            <CategoryButtons>
              <div>
                Sort by price:
                <CategoryButton
                  isActive={currentSorting === "asc"}
                  onClick={() => {
                  sortMenuItemsByPrice(true)
                }}>Asc</CategoryButton>
                
                <CategoryButton
                  isActive={currentSorting === "desc"}
                  onClick={() => {
                  sortMenuItemsByPrice(false)
                }}>Desc</CategoryButton>
              </div>
              <div>
                <CategoryButton
                  isActive={currentFilter === ""}
                  onClick={() => filterMenuItems(MenuCategory.all)}>
                  <CategoryIcon src={allCategoriesIcon} alt="" /> All
                </CategoryButton>

                <CategoryButton
                  isActive={currentFilter === MenuCategory.spicy}
                  onClick={() => filterMenuItems(MenuCategory.spicy)}>
                  <CategoryIcon src={fireIcon} alt="" /> Spicy
                </CategoryButton>
                <CategoryButton
                  isActive={currentFilter === MenuCategory.vege}
                  onClick={() => filterMenuItems(MenuCategory.vege)}>
                  <CategoryIcon src={vegeIcon} alt="" /> Vege
                </CategoryButton>
                <CategoryButton
                  isActive={currentFilter === MenuCategory.lactoseFree}
                  onClick={() => filterMenuItems(MenuCategory.lactoseFree)}>
                  <CategoryIcon src={noLactoseIcon} alt="" /> Lactose free
                </CategoryButton>
              </div>
            </CategoryButtons>

            <CategoryButtons>
              <div>
                Search: <SearchInput
                  type="text"
                  placeholder="search for a dish"
                  onChange={(e) => {
                    searchMenuItems(e.target.value)
                  }} />
              </div>
            </CategoryButtons>

            <H1>Menu</H1>
            <MenuList
              items={filteredMenuItems}
              setIsModalOpen={setIsModalOpen}
              setCurrentItem={setCurrentlySelectedMenuItem}
            />
          </PageBackground>
        )}
      </>
    )
  }
}

export default MenuPage