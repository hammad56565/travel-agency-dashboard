import React from 'react'
import { Outlet, redirect } from 'react-router'
import MobileSidebar from '../../../components/MobileSidebar'
import Navitems from '../../../components/Navitems'
import Sidebar from '../../../components/Sidebar'
import { account } from "~/appwrite/client";
import { getExistingUser, storeUserData } from '~/appwrite/auth'

export async function clientLoader() {
 try {
   const user = await account.get();

   if (!user.$id)  return  redirect('/sign-in') ; // Redirect to home if user is not authenticated 
    const existingUser = await getExistingUser(user.$id);
    if (existingUser?.status == 'user') return redirect('/'); // Redirect to sign-in if user does not exist in the database
   return existingUser?.$id ? existingUser : await storeUserData();
  } catch (e) {
  console.log({message : 'error fetching user' , e})
  return redirect('/sign-in'); // Redirect to sign-in if there is an error fetching user
 }

}


const AdminLayout = () => {
  return (
    <div className='admin-layout'>
     <MobileSidebar />
     <div  className='mobile-sidebar wrapper'><Sidebar/></div>
     
 <aside className='w-full  max-w-[270px] px-3 hidden lg:block' >
        <Navitems></Navitems>
      </aside>
        
        <aside className='children'>
            <Outlet />
        </aside>
 
    </div>
  )
}

export default AdminLayout
