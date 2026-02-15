import React from 'react'
import { LoginForm } from '@/components/module/authentication/login-form'

export default function Signin() {
  return (
    <div className='flex justify-center items-center h-screen'>
      <div className=' p-2 w-2xl'>
        <LoginForm />
      </div>
    </div>
  )
}
