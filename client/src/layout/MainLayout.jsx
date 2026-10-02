import React from 'react'
import { Outlet } from 'react-router'
import Navbar from '../components/Navbar'

const MainLayout = () => {
  return (
    <div className='p-2'>
      <Navbar />
      <Outlet />
    </div>
  )
}

export default MainLayout
