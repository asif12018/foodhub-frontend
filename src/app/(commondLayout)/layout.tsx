import { Navbar } from '@/components/navbar5'
import React from 'react'

export default function CommonLayout({children}: {children:React.ReactNode}) {
  return (
    <div>
      <Navbar></Navbar>
      {children}
    </div>
  )
}
