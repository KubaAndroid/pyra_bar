import { Link } from 'react-router-dom'
import pyra from '../../assets/img/potato_logo.png';
import styled from 'styled-components';
import { useOrderContext } from '../../context/ShopContext';

const HeaderDiv = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  height: 100px;
  margin-left: 10%;
  width: 80%;
  padding: 3px 0;
  background-color: #C5B7A2;
  position: fixed;
`

const LogoStyle = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: flex-start;
  width: 35%;
`
const PyraDiv = styled.div`
  width: 30%;
  font-size: 60px;
  display: flex;
  justify-content: center;
`
const NavigationDiv = styled.div`
  width: 35%;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 15px;

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
  }

  li {
    margin-left: 2rem;
  }

  a {
    text-decoration: none;
  }
  a:hover, a:active {
    color: #E8E3D6;
    transition: all 0.2s ease 0s;
  }
`
const BadgeSpan = styled.span`
  background-color: #545041;
  color: white;
  border-radius: 8px;
  padding: 0 1rem;
  margin-left: 0.5rem;
`

interface IHeaderProps {
  orderQuantity: number
} 

export const Header = ({orderQuantity }: IHeaderProps) => {
  // const { orderQuantity } = useOrderContext()

    return (
        <HeaderDiv>
        <LogoStyle>
          <Link to='/'>
            <img src={pyra} width="100" height="100" alt='logo' />
          </Link>
        </LogoStyle>
        <PyraDiv>Bar Pyra</PyraDiv>
        <NavigationDiv>
          <nav>
              <ul>
                <li><Link to='/'>Menu</Link></li>
                    <li>
                        <Link to='/order'>Order<BadgeSpan data-testid="badge">{orderQuantity}</BadgeSpan></Link>
                    </li>
                <li><Link to='/orderslist'>Orders List</Link></li>
              </ul>
          </nav>
        </NavigationDiv>
    </HeaderDiv>
  )
}

export default Header