import React from 'react'
import Login from './Components/Login'
import Signup from './Components/Signup'
import Home from './Components/Home'

const page = () => {
  return (
    <>
   <div className='p-4 h-screen flex items-center justify-center bg-gray-700 bg-[url("https://r4.wallpaperflare.com/wallpaper/286/116/844/4k-high-resolution-mac-wallpaper-d8168d6830b0bc08908ce13ea8f204da.jpg")] bg-no-repeat bg-cover'>
    {/* <Login/> */}
    {/* <Signup/> */}
    <Home/>
   </div>
    </>
  )
}

export default page