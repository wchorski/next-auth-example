import React from 'react'

import { LoginForm } from '../../components/LoginForm'
// import { getProviders, getCsrfToken, signIn, getSession } from "next-auth/react"

const Login = (  ) => {

  // function handleLogin({username, password}){
  //   signIn("credentials", { username, password })
  // }


  return (<>

    {/* if i wanted to login with Facebook Twitter etc */}
    {/* {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button onClick={() => signIn(provider.id)}>
            Sign in with {provider.name}
          </button>
        </div>
      ))} */}

    <LoginForm />
  </>)
}

// export async function getServerSideProps(context) {
  
//   const { req } = context;
//   const session = await getSession({ req });

//   if (session) {
//     return {
//       redirect: { destination: "/mypage" },
//     };
//   }

//   return {
//     props: { 
//       providers: await getProviders(context),
//       csrfToken: await getCsrfToken(context), 
//     },
//   }
// }



export default Login