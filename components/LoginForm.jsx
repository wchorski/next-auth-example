import React, {useState} from 'react'
import { getProviders, getCsrfToken, signIn, getSession } from "next-auth/react"
import { useRouter } from "next/router";
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup';
import { StyledFormSimple } from '../styles/FormSimple.styled';

export const LoginForm = ({ providers, csrfToken }) => {

  const { error } = useRouter().query;

  const [dbStatus, setdbStatus] = useState('')

  const loginUser = async (values) => {

    try {
      signIn("credentials", { 
        email: values.email, 
        password: values.password 
      })

    } catch (err) {
      console.error('loginUser error: ', err)
      setdbStatus('error: ' + err )
    }
    
  }

  const LoginSchema = Yup.object().shape({

    email: Yup.string().required('* required').email(),  
    password: Yup.string().required('* required'),
  })

  return (
    <StyledFormSimple>
    <div className='cont'>
      <h2>Login</h2>

      <SignInError error={error} />

      <Formik
        initialValues={{ email: "", password: ""}}
        validationSchema={LoginSchema}
        validateOnChange={false} // disable on every keystroke
        onSubmit={(values, actions) => {
          // alert(JSON.stringify(values, null, 2))
          loginUser(values)
          actions.resetForm()
        }}
      >
        {({ errors, touched }) => (
          <Form>

            <div className='form-item'>
              <Field name="email" type="text" placeholder="email..." className='email'/>
              <span className='formErr'>{errors.email && touched.email ? errors.email : null}</span>
            </div>

            <div className='form-item'>
              <Field name="password" type="password" placeholder="password..." className='password'/>
              <span className='formErr'>{errors.password && touched.password ? errors.password : null}</span>
            </div>

            <button className='submitPost' type='submit'> Login </button>
          </Form>
        )}
      </Formik>
      <span>{dbStatus}</span>
    </div>
    </StyledFormSimple>
  )
}

export async function getServerSideProps(context) {
  
  const { req } = context;
  const session = await getSession({ req });

  if (session) {
    return {
      redirect: { destination: "/mypage" },
    };
  }

  return {
    props: { 
      providers: await getProviders(context),
      csrfToken: await getCsrfToken(context), 
    },
  }
}

const errorsMsg = {
  Signin: "Try signing with a different account.",
  OAuthSignin: "Try signing with a different account.",
  OAuthCallback: "Try signing with a different account.",
  OAuthCreateAccount: "Try signing with a different account.",
  EmailCreateAccount: "Try signing with a different account.",
  Callback: "Try signing with a different account.",
  OAuthAccountNotLinked:
    "To confirm your identity, sign in with the same account you used originally.",
  EmailSignin: "Check your email address.",
  CredentialsSignin:
    "Sign in failed. Email or Password is incorrect.",
  default: "Unable to sign in. Contact us with the email used for this account for help",
};
const SignInError = ({ error }) => {
  const errorMessage = error && (errorsMsg[error] ?? errorsMsg.default);
  return <p className='formErr'>{errorMessage}</p>;
};