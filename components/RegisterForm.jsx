import React, {useState} from 'react'
import { signIn } from "next-auth/react"
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup';
import { StyledFormSimple } from '../styles/FormSimple.styled';
import { MdPassword, MdEmail, MdFormatColorFill } from "react-icons/md";
import { BiUserCircle } from "react-icons/bi";

export const RegisterForm = () => {

  const [dbMessage, setDbMessage] = useState('')

  const RegisterUser = async (values) => {
    // console.log(values);
    
    try {
      const res = await fetch('/api/users/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify(values)
      })

      const data = await res.json()

      if(data.status === 409) return setDbMessage(data.message)

      if(data.status === 201) {
        setDbMessage(''); 
        return signIn('yourProviderHere', { callbackUrl: '/planner' })
      }
    

    } catch (err) {
      console.error(err)
    }

  }

  const RegisterSchema = Yup.object().shape({

    name: Yup.string().required('* required'),
    email: Yup.string().required('* required').email(),
    password: Yup.string().required('* required'),
    color: Yup.string().required('* required'),

  })

  return (
    <StyledFormSimple className='login-wrapper'>
    <div className='cont'>
      <h2>Register</h2>
      <p className='formErr'>{dbMessage}</p>

      <Formik
        initialValues={{ name: "", email: "", password: "", color: "#ff00a5" }}
        validationSchema={RegisterSchema}
        validateOnChange={false} // disable on every keystroke
        onSubmit={(values, actions) => {
          // alert(JSON.stringify(values, null, 2))
          RegisterUser(values)
          actions.resetForm()
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <div className='form-item'>
              <label> <MdEmail /> email</label>
              <Field name="email" type="email" placeholder="Beagle@gmail.com" className='email' autoComplete="off" />
              <span className='formErr'>{errors.email && touched.email ? errors.email : null}</span>
            </div>


            <div className='form-item'>
              <label> <MdPassword /> password</label>
              <Field name="password" type="password" placeholder="*********" className='password' autoComplete="new-password" />
              <span className='formErr'>{errors.password && touched.password ? errors.password : null}</span>
            </div>
            <br />


            <div className='form-item'>
              <label> <BiUserCircle /> username</label>
              <Field name="name" type="text" placeholder="username..." className='name' autoComplete="off" />
              <span className='formErr'>{errors.name && touched.name ? errors.name : null}</span>
            </div>

            <div className='form-item'>
              <label> <MdFormatColorFill /> favorite color </label>
              <Field name="color" type="color" className='color' />
              <span className='formErr'>{errors.color && touched.color ? errors.color : null}</span>
            </div>
            <br />

            <button className='submitPost' type='submit'> Register New User </button>
          </Form>
        )}
      </Formik>
    </div>
    </StyledFormSimple>
  )
}
