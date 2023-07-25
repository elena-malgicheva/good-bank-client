import { React } from "react";
import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from "yup";
import { Input, Submit } from "./styles";
import { RiUserAddFill } from 'react-icons/ri';

import { useUsersDispatch } from '../Context/UsersContext';


const validationSchema = Yup.object().shape({
  fullname: Yup.string()
    .min(2, "Your name is too short")
    .required("Please enter your full name"),
  email: Yup.string()
    .email("The email is incorrect")
    .required("Please enter your email"),
  password: Yup.string()
    .min(8, "Your password is too short, it should be 8 characters or more")
    .required("Please enter your password")
});

function Register() {

  let nextId = 4;
  const dispatch = useUsersDispatch(); 

  return (
    
    <div className="app-card w-50 p-5 m-3 create-color">
      <h1><RiUserAddFill/> Create Account</h1>
      <hr />
      
       <Formik
        initialValues={{ 
          validateOnMount: true,
          fullname: "", 
          email: "", 
          password: "" }}
 
        validationSchema={validationSchema}

        onSubmit={(values, { setSubmitting, resetForm }) => {
         setTimeout(() => {
            dispatch({
              type: 'add',
              id: nextId++,
              name: values.fullname,
              email: values.email,
              password: values.password
            });
           
           alert("Account for user " + values.fullname + " successfully created")
           setSubmitting(false);
           resetForm();

           ;
         }, 400);
       }}
       >
          {({ isSubmitting, dirty }) => (
             
            <Form>
            
              <Input
                type="text"
                name="fullname"
                placeholder="NAME"   
              />
              <ErrorMessage name="fullname" component="div" style={{ color:'red' }}/>
 
              <Input
                type="email"
                name="email"
                placeholder="EMAIL"
                className="form-control"    
              />
              <ErrorMessage name="email" component="div" style={{ color:'red' }} />
 
              <Input 
                 type="password" 
                 name="password"
                 placeholder="PASSWORD" 
                 className="form-control"       
             />
              <ErrorMessage name="password" component="div" style={{ color:'red' }} />
         
              <Submit  
              type="submit" 
              disabled={!dirty || isSubmitting}           
              >CREATE ACCOUNT</Submit>
            </Form>
          )}
        
        </Formik>
      </div>
    
 );
}

export default Register;