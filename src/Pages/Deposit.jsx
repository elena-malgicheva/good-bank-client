
import { useBalanceDispatch, useBalance } from '../Context/BalanceContext';
import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from "yup";
import { Input, Submit } from "./styles";
import { FaPiggyBank } from 'react-icons/fa';


const validationSchema = Yup.object().shape({
  deposit: Yup.number()
    .min(0, "You can deposit only positive amount")
});

function Deposit() {

  const balance = useBalance();
  const dispatch = useBalanceDispatch(); 

    return (
      <div className="app-card w-50 p-5 m-3 deposit-color">
        <h1><FaPiggyBank/> DEPOSIT</h1>
        <hr/>
        <h4 className='pt-3'>Your current balance is ${balance}.00</h4>

        <Formik
        initialValues={{ 
          validateOnMount: true,
          deposit: "", 
          }}
 
        validationSchema={validationSchema}

        onSubmit={(values, { setSubmitting, resetForm }) => {
         setTimeout(() => {
            dispatch({
              type: 'deposit',
              value: values.deposit
            });
           
           alert(
            "Success! Deposit was recieved: $" + values.deposit + '.00\n' 
           + 'Your new balance is $'+ (Number(values.deposit) + Number(balance)) + '.00' );
           setSubmitting(false);
           resetForm();
         }, 400);
       }}
       >
          {({ isSubmitting, dirty }) => (
             
            <Form>
              <h4 className='pt-5'>DEPOSIT AMOUNT</h4>
              <Input
                min='0'
                type="number"
                name="deposit"
                placeholder="ENTER AMOUNT YOU WANT TO DEPOSIT"   
              />
              <ErrorMessage name="deposit" component="div" style={{ color:'white' }}/>
              <Submit  
              type="submit" 
              disabled={!dirty || isSubmitting}           
              >DEPOSIT</Submit>
            </Form>
          )}
        
        </Formik>
      </div>
    );
  }

export default Deposit;