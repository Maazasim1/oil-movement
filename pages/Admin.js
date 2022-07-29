import React from 'react'
import Dashboard from '../components/dashboard'
import { useSession, getSession } from "next-auth/react"


export default function Admin() {
  const { data: session, status } = useSession()
      console.log("session",session);
  
      if (status === "loading") {
          return <p>Loading...</p>
        }
      
        if (status === "unauthenticated") {
          return <p>Access Denied</p>
        }
        if(status==="authenticated" && session.user.name==="Admin"){

          return (
            <div>
                <Dashboard />
            </div>
          )
        }
}
