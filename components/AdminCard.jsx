import React from 'react'
import { useSession, signIn, signOut } from "next-auth/react"


export const AdminCard = () => {

  const { data: session } = useSession()

  return (<>
  {session && (
    <h1>AdminCard</h1>
  )}
  </>)
}
