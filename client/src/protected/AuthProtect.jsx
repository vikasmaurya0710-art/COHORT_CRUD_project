import React from 'react'
import { Navigate, Outlet } from 'react-router'

const AuthProtect = () => {

let accessToken = localStorage.getItem("accessToken")

if(accessToken){
return <Navigate to="/dashboard" replace />;  
   
}

  return (
    <div>
      <Outlet />
    </div>
  )
}

export default AuthProtect
