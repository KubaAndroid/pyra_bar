import { Link } from 'react-router-dom'
import pyra from '../../assets/img/potato_logo.png';
import styled from 'styled-components';

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
  width: 38%;
  @media screen and (max-width: 1000px) {
    height: 100px;
    width: 30%;
  }
`
const PyraDiv = styled.div`
  width: 24%;
  font-size: 52px;
  display: flex;
  justify-content: center;
  @media screen and (max-width: 1000px) {
    display: none;
  }
  @media screen and (max-width: 1200px) {
    font-size: 42px;
  }
`
const NavigationDiv = styled.div`
  width: 38%;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 15px;
  flex-wrap: nowrap;
  @media screen and (max-width: 1000px) {
    width: 70%;
    font-size: 14px;
  }
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    @media screen and (max-width: 1000px) {
      justify-content: flex-end;
      align-items: flex-end;
    }
  }
  li {
    margin-left: 1.6rem;
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
  margin-left: 0.2rem;
`

interface IHeaderProps {
  orderQuantity: number
} 

export const Header = ({ orderQuantity }: IHeaderProps) => {
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