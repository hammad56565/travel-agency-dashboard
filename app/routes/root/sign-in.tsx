'use client';
import { Link, redirect } from "react-router"
import { Button } from "@mui/material";
import { loginWithGoogle } from "~/appwrite/auth";
import { account } from "~/appwrite/client";

export async function clientLoader() {
 try {
   const user = await account.get();

   if (user.$id) {
     return redirect('/'); }// Redirect to home if user is not authenticated 
 } catch (e) {
  console.log('error fetching user')
 }

}

const SignIn = () => {
  return (
   <main className="auth">
      <section className="glassmorphism size-full flex-center px-6">
           <div className="sign-in-card">
            <header className="header">
              <Link to='/'> 
              <img src="/assets/icons/logo.svg" alt="logo" className="size-[30px]"/>
              </Link>
              <h1 className="p-28-bold  text-dark-100">Tourvisto</h1>

            </header>
            <article>
              <h2 className="p-28-semibold text-dark-200 text-center">Start Your Travel Journey</h2>
            <p className="p-28-regular text-center text-gray-100 !leading-7">Sign in with
              Google to manage Destination, itineraries ,and all user activity with ease
            </p>

            </article>
            <Button variant="contained" className="button-class !h-11 w-full" onClick={loginWithGoogle} 
            type="button" icon='e-search-icon'>
              <img src="/assets/icons/google.svg" alt="google" className="size-5"  /></Button>
           </div>
      </section>

   </main>
  )
}

export default SignIn
