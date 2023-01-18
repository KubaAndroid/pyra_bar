import styled from "styled-components"
import ContactForm from "../components/contact/ContactForm"

const ContactContainer = styled.div`
padding-top: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`

const ContactPage = () => {
  return (
    <ContactContainer>
      <ContactForm />
    </ContactContainer>
  )
}

export default ContactPage