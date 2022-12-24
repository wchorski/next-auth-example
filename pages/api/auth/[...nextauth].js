import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import CredentialProvider from 'next-auth/providers/credentials'

import * as Nano  from 'nano'
import { DB_ENDPOINT } from "../../../js/db_endpoint";
const bcrypt = require('bcrypt');
const nano = Nano(DB_ENDPOINT())

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),

    CredentialProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "love@mail.com" },
        password: { label: "Password", type: "password", placeholder: "..." },
      },
      authorize: async (credentials) => {

        const db = nano.db.use('users')
        // ? 'org.couchdb.user:EMAIL' is CouchDB's native way of writing ID's 
        const foundUser = await db.get(`user:${credentials.email}`)

        console.log("user login: " + foundUser.email);

        if (foundUser === null) {
          console.log('user dont exist');
          return null
        } // unauthorized

        const match = await bcrypt.compare(credentials.password, foundUser.password)
        // if(!match) return {status: 401, message: 'incorrect password'} 

        if (credentials.email === foundUser.email && match) {
          console.log('auth is working, ', foundUser.email);
          return {
            id: foundUser._id,
            name: foundUser.name,
            email: foundUser.email,
            color: foundUser.color,
            roles: foundUser.roles
          }
        }

        // login failed catch all
        console.log('login no work for, ', credentials.email);
        return null;
      },
    })
  ],

  pages: {
    signIn: '/auth/login',
    signOut: '/auth/signout',
    // error: '/auth/error', // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // (used for check email message)
    newUser: '/', // New users will be directed here on first sign in (leave the property out if not of interest)
    error: '/auth/login'
  },


  callbacks: {
    async jwt ({ token, user }) {
      if (user) {
        token.id = user.id,
        token.color = user.color
        token.roles = user.roles

      }
      return token
    },
    async session ({ session, token }) {
      if (token) {
        session.user.id = token.id,
        session.user.color = token.color
        session.user.roles = token.roles

      }
      console.log('nextauth created session, ', session);
      return session
    }
  },
  secret: process.env.JWT_SECRET,
  jwt: {
    secret: process.env.JWT_SECRET,
    encryption: true,
  }
}

export default NextAuth(authOptions)