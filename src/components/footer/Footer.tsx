import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faInstagram, faFacebook, faSnapchat } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom'
import styled from 'styled-components';

const FooterDiv = styled.footer`
  display: flex;
  flex-direction: column;
  margin-left: 10%;
  margin-top: 0;
  margin-bottom: 10px;
  width: 80%;
  height: 14rem;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  background-color: #dbd5cc;
  border-radius: 0 0 15px 15px;
  padding: 0;
`
const TopLinks = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 80%;
  margin: 5px;
`
const FooterIcons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 50%;
  margin: 25px;
`


const Footer = () => {
  return (
    <FooterDiv>
      <hr style={{width: "80%", color: 'white', margin: '22px'}}></hr>
      <TopLinks>
        <p><Link to='/contact'>Contact</Link></p>
        <p><Link to='/contact'>About us</Link></p>
        <p><Link to='/contact'>Terms & Conditions</Link></p>
        <p><Link to='/contact'>Privacy policy</Link></p>
        <p><Link to='/contact'>Cookies policy</Link></p>
      </TopLinks>

      <FooterIcons>
        <p><FontAwesomeIcon icon={ faTwitter } style={{height: '50px'}}></FontAwesomeIcon></p>
        <p><FontAwesomeIcon icon={ faInstagram } style={{height: '50px'}}></FontAwesomeIcon></p>
        <div><FontAwesomeIcon icon={ faFacebook } style={{height: '50px'}}></FontAwesomeIcon></div>
        <FontAwesomeIcon icon={ faSnapchat } style={{height: '50px'}}></FontAwesomeIcon>
      </FooterIcons>

      <p>Copyright &copy; 2023</p>
    </FooterDiv>
  )
}

export default Footer