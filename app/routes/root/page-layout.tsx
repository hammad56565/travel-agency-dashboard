import { logoutUser } from '~/appwrite/auth'
// import React from "react";
import { useNavigate } from "react-router"; // ✅ add this line
// other imports...

const PageLayout = () => {
      const navigate = useNavigate()

    const handleLogout = async () => {
        // Implement logout functionality here
        console.log('logout')
        await logoutUser() 
        navigate('/sign-in')
    }
  return (
    <div className='flex items-center justify-between p-4 bg-gray-100'>
       <button onClick={handleLogout} className='cursor-pointer'>
                <img src="/assets/icons/logout.svg" alt="logout" className='size-6' />
            </button>

            <button className="cursor-pointer" onClick={()=>{navigate('/dashboard')}}>Dashboard</button>
    </div>
  )
}

export default PageLayout
