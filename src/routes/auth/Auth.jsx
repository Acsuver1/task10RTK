import React from 'react'
import { Outlet } from 'react-router-dom'

const Auth = () => {
  return (
    <div className='flex items-center justify-center min-h-screen '>
        <div className='max-w-[400px] flex-1 bg-white'> 
            <Outlet/>
        </div>
    </div>
  )
}

export default Auth