import { FormEvent, MutableRefObject, useRef } from 'react'
// import { useNavigate } from 'react-router-dom';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import { H1 } from '../../pages/MenuPage';
import { FormButton } from '../order/OrderForm';

const ContactFormContainer = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background-color: #dbd5cc;
  width: 80%;
  color: #545041;
`

const FormFieldsDiv = styled.div`
  margin-bottom: 0.5rem;
  display: flex;
  flex-direction: column;
  font-weight: bold;
  margin-bottom: 0.5rem;
  min-width: 350px;
`

const FormFieldInput = styled.input`
  display: block;
  border-radius: 4px;
  border: 1px solid #ccc;
  padding: 0.5rem;
  min-width: 200px;
  border-radius: 18px;
  margin: 8px;
`

const FormFieldTextArea = styled.textarea`
  display: block;
  border-radius: 4px;
  border: 1px solid #ccc;
  padding: 0.5rem;
  min-width: 200px;
  border-radius: 18px;
  margin: 8px;
  min-height: 200px;
`

export class UserMessage {
  email?: string;
  message?: string;
}

const ContactForm = () => {
  const emailInputRef: MutableRefObject<HTMLInputElement | null> = useRef(null);
  const messageInputRef: MutableRefObject<HTMLTextAreaElement | null> = useRef(null);
  let navigate = useNavigate();

  function submitHandler(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const enteredEmail = emailInputRef.current?.value
    const enteredMessage = messageInputRef.current?.value
    const _userMessage: UserMessage = { email: enteredEmail, message: enteredMessage }
    postUserComment(_userMessage)
  }

  async function postUserComment(msg: UserMessage) {
    await fetch('http://localhost:5000/comments', {
      method: "POST",
      body: JSON.stringify(msg),
      headers: {
          "Content-Type": "application/json"
      }
    }).then(() => {
        navigate('/', {replace: true})
    })
  }

  return (
    <ContactFormContainer>
      <form onSubmit={submitHandler}>
        <H1>Contact us</H1>
        <FormFieldsDiv>
          <label htmlFor='email'>Your email address:</label>
          <FormFieldInput type='email' id='email' required ref={emailInputRef} placeholder='email address' />
          <label htmlFor="message">Message</label>
          <FormFieldTextArea id="message" required ref={messageInputRef} placeholder='message' />
        </FormFieldsDiv>
        <div>
            <FormButton>Send message</FormButton>
        </div>
      </form>
    </ContactFormContainer>
  )
}

export default ContactForm