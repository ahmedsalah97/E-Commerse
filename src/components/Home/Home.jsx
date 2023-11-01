
import React from 'react'
import CategorySlider from '../CategorySlider/CategorySlider'
import MainSlider from '../MainSlider/MainSlider'
import Proudcts from '../Proudcts/Proudcts'
import { Helmet } from 'react-helmet'







export default function Home() {
  return (
    <div>
          <Helmet>
        
        <title>Fresh Cart Home</title>
        
      
    </Helmet>
   <MainSlider/>
   <Proudcts/>
    </div>
  )
}
