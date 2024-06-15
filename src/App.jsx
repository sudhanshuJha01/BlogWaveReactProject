import React, { useState } from 'react'
import {Header , Footer } from '../src/components/index'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import authService from './appwrite/auth'
import {login,logout} from './store/authSlice'

function App() {
  const [loading , setLoading ] = useState(true)
  
  const dispatch = useDispatch()

   useEffect(()=>{
      authService.getCurrentUSer()
      .then((userData)=>{
        if(userData){
          dispatch(login({userData}))
        }else{
          dispatch(logout())
        }
      })
      .finally(()=>{
        setLoading(false)
      })
   },[])

   return !loading?<div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
   <div className='w-full block'>
           {console.log('Hello')
           }
     <Header />
     <main>
      todo: {/* <Outlet /> */}
     </main>
     <Footer />
   </div>

 </div>:null
}

export default App


