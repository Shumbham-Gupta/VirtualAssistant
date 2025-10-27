import React from 'react'
import { useContext } from 'react';
import { userDataContext } from '../context/UserContext';

function Card({image}) {

  const {serverUrl,userData,setUserData,frontendImage, setFrontendImage,backendImage, setBackendImage,selectedImage, setSelectedImage}=useContext(userDataContext);
  return (
    <div className={`w-[140px] h-[210px] bg-[#0606cc5a] border-2 border-[#4c4cf2a7] rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-blue-700 cursor-pointer hover:border-4 hover:border-white ${selectedImage==image?"border-4 border-white shadow-2xl shadow-blue-900":null}`} 
    onClick={()=>{
      setSelectedImage(image);
      setBackendImage(null);
      setFrontendImage(null);
    }}>
      <img src={image}  className='h-full object-cover'/>
    </div>
  )
}

export default Card
