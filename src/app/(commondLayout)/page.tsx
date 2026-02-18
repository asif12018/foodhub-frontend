import { Hero1 } from '@/components/hero1'
import React from 'react'
import FoodSection from '@/components/module/food-section/food-section'

export default function Home() {
  return (
    <div>
      <div className='flex justify-center items-center'>
      <Hero1></Hero1>
       
    </div>
    <FoodSection></FoodSection>
    </div>
  )
}
