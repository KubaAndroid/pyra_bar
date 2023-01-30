import styled from "styled-components"
import { useOrderContext } from "../context/ShopContext";
import fireIcon from '../assets/img/fire.png';
import vegeIcon from '../assets/img/plant.png';
import noLactoseIcon from '../assets/img/vegan.png';
import allCategoriesIcon from '../assets/img/food.png';
import { useEffect } from "react";
import MenuModal from "../components/menu/MenuModal";
import MenuList from "../components/menu/MenuList";
import { getAllMenuItems, searchMenuItems } from "../utils/index"

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
  @media screen and (max-width: 1000px) {
    width: 100%;
    font-size: 14px;
    flex-direction: column;
    padding: 0px;
  }
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
    allMenuItems,
    setMenuItems,
    filteredMenuItems,
    setFilteredMenuItems,
    sortMenuItemsByPrice,
    filterMenuItems,
    currentFilter,
    currentSorting,
    setIsModalOpen,
    isModalOpen,
    currentlySelectedMenuItem,
    setSearchQuery,

  } = useOrderContext()

  useEffect(() => {
    const getMenuItems = async () => {
      const menuItems = await getAllMenuItems(allMenuItems, setMenuItems, setFilteredMenuItems)
      setFilteredMenuItems(menuItems)
    }
    getMenuItems()
  }, [])
  
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
                <CategoryIcon src={allCategoriesIcon} alt="all" /> All
              </CategoryButton>
              <CategoryButton
                isActive={currentFilter === MenuCategory.spicy}
                onClick={() => filterMenuItems(MenuCategory.spicy)}>
                <CategoryIcon src={fireIcon} alt="spicy" /> Spicy
              </CategoryButton>
              <CategoryButton
                isActive={currentFilter === MenuCategory.vege}
                onClick={() => filterMenuItems(MenuCategory.vege)}>
                <CategoryIcon src={vegeIcon} alt="vege" /> Vege
              </CategoryButton>
              <CategoryButton
                isActive={currentFilter === MenuCategory.lactoseFree}
                onClick={() => filterMenuItems(MenuCategory.lactoseFree)}>
                <CategoryIcon src={noLactoseIcon} alt="lactoseFree" /> Lactose free
              </CategoryButton>
            </div>
          </CategoryButtons>

          <CategoryButtons>
            <div>
              Search: <SearchInput
                type="text"
                placeholder="search for a dish"
                onChange={(e) => {
                  searchMenuItems(
                    e.target.value,
                    setSearchQuery,
                    allMenuItems,
                    currentFilter,
                    setFilteredMenuItems
                    )
                }} />
            </div>
          </CategoryButtons>

          <H1>Menu</H1>
          <MenuList
            items={filteredMenuItems}
          />
        </PageBackground>
      )}
    </>
  )
}

export default MenuPage