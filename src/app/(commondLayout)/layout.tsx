import { Navbar } from '@/components/navbar5'
import React from 'react'

export default function CommonLayout({children}: {children:React.ReactNode}) {
  return (
    <div>
      <Navbar className='flex items-center justify-center'></Navbar>
      {children}
    </div>
  )
}
