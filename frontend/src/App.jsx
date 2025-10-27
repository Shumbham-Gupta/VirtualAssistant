// 
import React from 'react'
import {Route, Routes } from 'react-router-dom'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Customize from './pages/Customize'
import { useContext } from 'react'
import { userDataContext } from './context/UserContext'
import Home from './pages/Home' 
import { Navigate } from 'react-router-dom'
import Customize2 from './pages/Customize2'


function App() {
  const {userData,setUserData}=useContext(userDataContext);
  return (
    <Routes>
      <Route path="/" element={(userData?.assistantImage && 
  userData?.assistantName)?<Home/>:<Navigate to={"/customize"}/>}/>
  <Route path="/signup" element={!userData?<SignUp />:<Navigate to ={"/"}/>} />
<Route path="/signin" element={!userData?<SignIn />:<Navigate to ={"/customize"}/>} />
<Route path="/customize" element={userData?<Customize />:<Navigate to ={"/signup"}/>} />
<Route path="/customize2" element={userData?<Customize2 />:<Navigate to ={"/signup"}/>} />
    </Routes>
  )
}
  
export default App
