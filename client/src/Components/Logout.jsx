import React from 'react'
import { BiLogOut } from "react-icons/bi";
import useLogout from '../Hooks/useLogout';

const Logout = () => {

  const {loading,logout} = useLogout()

  return (
    <>
    <div className='mt-auto'>
    {!loading ? (<BiLogOut className='w-6 h-6 cursor-pointer text-white mt-3' onClick={logout}/>):
    ( <span className='loading loading-spinner'></span> )}
    </div>
    </>
  )
}

export default Logout