
import { useBalanceDispatch, useBalance } from '../Context/BalanceContext';
import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from "yup";
import { Input, Submit } from "./styles";
import { RiMoneyDollarCircleFill } from 'react-icons/ri'

function Withdraw() {

  const balance = useBalance();
  const validationSchema = Yup.object().shape({
    deposit: Yup.number()
    .positive("You can withdraw only positive amount")
  });

  const dispatch = useBalanceDispatch(); 

    return (
      <div className="app-card w-50 p-5 m-3 withdraw-color">
        <h1><RiMoneyDollarCircleFill/> WITHDRAW</h1>
        <hr/>
        <h4 className='pt-3 font-weight-light'>Your current balance is ${balance}.00</h4>

        <Formik
        initialValues={{ 
          validateOnMount: true,
          withdraw: "", 
          }}
 
        validationSchema={validationSchema}

        onSubmit={(values, { setSubmitting, resetForm }) => {
         setTimeout(() => {
            dispatch({
              type: 'withdraw',
              value: values.withdraw
            });
           
           alert("Success! Your withdrawal of $" + values.withdraw + ".00 has been processed\n" 
           + 'Your new balance is $'+ (Number(balance) - Number(values.withdraw)) + '.00' );
           setSubmitting(false);
           resetForm();
           
         }, 400);
       }}
       >
          {({ isSubmitting, dirty }) => (
             
            <Form>
              <h4 className='pt-5'>WITHDRAW AMOUNT</h4>
              <Input
                type="number"
                name="withdraw"
                min={0}
                max={balance}
                placeholder="ENTER AMOUNT YOU WANT TO WITHDRAW"   
              />
              <ErrorMessage name="withdraw" component="div" style={{ color:'white' }}/>
              
              <Submit  
                type="submit" 
                disabled={!dirty || isSubmitting}         
              >WITHDRAW
              </Submit>
            </Form>
          )}
        
        </Formik>
      </div>
    );
  }


export default Withdraw;