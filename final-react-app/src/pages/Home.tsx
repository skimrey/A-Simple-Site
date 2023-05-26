import React from 'react'
import Background from '../assets/images/background.jpg'

function Home() {
  return (
    <div
      style={{ backgroundImage: `url(${ Background })`}}
      className='mydiv flex flex-row justify center w-screen bg-cover mx-auto bg-scroll'
       >
          <div className='flex place-items-center h-screen'></div>
          
        </div>
    
  )
}

export default Home