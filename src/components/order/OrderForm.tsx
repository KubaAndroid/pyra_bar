import { useNavigate } from 'react-router-dom';
import UserOrdersModel from '../../models/UserOrdersModel';
import ClientModel from '../../models/ClientModel';
import { useOrderContext } from '../../context/ShopContext';
import { useForm, SubmitHandler } from 'react-hook-form';
import OrderSnackbar from './OrderSnackbar';
import styled from 'styled-components';
import { clearOrder, postOrder, saveUser } from '../../utils';


const FormContainer = styled.div`
  display: flex;
  width: 80%;
  margin-left: 10%;
  background-color: #dbd5cc;
  border-radius: 16px 16px 0 0;
  flex-direction: column;
  padding-top: 150px;
`
export const StyledForm = styled.form`
  display: flex;
  align-items: center;
  text-align: center;
  width: 90%;
  margin: auto;
  background-color: #dbd8cc;
  border-radius: 26px;
  padding: 15px;
  flex-direction: column;
`
const FormRow = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding-top: 10px;
  & input {
     font: inherit;
    border-radius: 14px;
    border: 1px solid #ccc;
    padding: 0.5rem;
  }
`
const FormColumn = styled.div`
  width: 45%;
  margin-bottom: 0.5rem;
  display: flex;
  flex-direction: column;
  text-align: left;
`
export const FormButton = styled.button`
  font: inherit;
  cursor: pointer;
  color: #545041;
  border: 1px solid #545041;
  background-color: transparent;
  padding: 0.5rem 1.5rem;
  border-radius: 5px;
  transition: all 0.2s ease 0s;
  width: auto;
  margin-top: 20px;
  &:hover {
    background-color: #e9e6e2;
  }
`
type Inputs = {
  fname: string,
  lname: string,
  phone: string,
  email: string,
  street: string,
  streetNumber: string,
  city: string,
  zip: string,
};

function OrderForm() {
    const {
        orderedMenuItems,
        setOrderItems,
        setOrderedMenuItems,
        setIsSnackbarVisible, 
        isSnackbarVisible,
        clientsList, 
        setClientsList
  } = useOrderContext()

  const { handleSubmit, register, formState: { errors } } = useForm<Inputs>();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<Inputs> = data => {
    const _user: ClientModel = {
      id: Math.floor(Math.random() * (10000000)) + 1,
      firstName: data.fname,
      lastName: data.lname,
      emailAddress: data.email,
      phoneNumber: data.phone,
      addressStreet: data.street,
      addressNumber: data.streetNumber,
      addressCity: data.city,
      addressZipCode: data.zip
    }
    saveUser(_user, clientsList, setClientsList)
    
    const orderedItemsIds = orderedMenuItems.map(({ id }) => id);
    const todayDate = new Date().toUTCString().slice(0, -4);
    const _userOrder: UserOrdersModel = {
        userId: _user.id,
        date: todayDate,
        menuItems: orderedItemsIds
    }
    postOrder(_userOrder, setIsSnackbarVisible);
    showSnack()
  }
  
  
  const showSnack = () => {
    setIsSnackbarVisible(true);
    clearOrder(setOrderItems, setOrderedMenuItems);
    setTimeout(() => {
      setIsSnackbarVisible(false);
      navigate('/', { replace: true });
    }, 3000);
  }
    
  return (
    <>
      <FormContainer>
        <StyledForm onSubmit={handleSubmit(onSubmit)}>
          <FormRow>
            <FormColumn>
              <label>First name:</label>
              <input type="text" placeholder="First name" {...register("fname", { required: true, maxLength: 80 })} />
              {errors.fname?.type === 'required' && <p role="alert" style={{ color: 'red' }}>First name is required</p>}
            </FormColumn>
            <FormColumn>
              <label>Last name:</label>
              <input type="text" placeholder="Last name" {...register("lname", { required: true, maxLength: 100 })} />
              {errors.lname?.type === 'required' && <p role="alert" style={{color: 'red'}}>Last name is required</p>}
            </FormColumn>
          </FormRow>
          
        <FormRow>
          <FormColumn>
            <label>Email:</label>
              <input type="text" placeholder="Email" {...register("email", { required: true, pattern: /^\S+@\S+$/i })} />
              {errors.email?.type === 'required' && <p role="alert" style={{ color: 'red' }}>email address is required</p>}
              </FormColumn>
              <FormColumn>
            <label>Mobile number:</label>
              <input type="tel" placeholder="Mobile number" {...register("phone", { required: true, minLength: 7, maxLength: 12 })} />
              {errors.phone?.type === 'required' && <p role="alert" style={{color: 'red'}}>phone number is required</p>}
          </FormColumn>
        </FormRow>

        <FormRow>
            <FormColumn>
              <label>Street:</label>
              <input type="text" placeholder="Street" {...register("street", { required: true, maxLength: 80 })} />
              {errors.street?.type === 'required' && <p role="alert" style={{ color: 'red' }}>street name is required</p>}
            </FormColumn>
            <FormColumn>
              <label>Street number:</label>
              <input type="text" placeholder="Street number" {...register("streetNumber", { required: true, maxLength: 80 })} />
              {errors.streetNumber?.type === 'required' && <p role="alert" style={{color: 'red'}}>street number is required</p>}
          </FormColumn>
        </FormRow>

        <FormRow>
          <FormColumn>
            <label>City:</label>
            <input type="text" placeholder="City" {...register("city", { required: true, maxLength: 80 })} />
            {errors.city?.type === 'required' && <p role="alert" style={{color: 'red'}}>city is required</p>}
          </FormColumn>
          <FormColumn>
            <label>Zip code:</label>
            <input type="text" placeholder="Zip code" {...register("zip", { required: true, maxLength: 80 })} />
            {errors.zip?.type === 'required' && <p role="alert" style={{color: 'red'}}>zip code is required</p>}
          </FormColumn>
        </FormRow>
        <FormButton>Place order</FormButton>
        </StyledForm>
        {isSnackbarVisible && <OrderSnackbar />}
      </FormContainer>
    </>
  )
}

export default OrderForm;