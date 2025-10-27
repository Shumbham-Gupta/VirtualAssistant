import React from 'react'
import { useState } from 'react'
import { useContext } from 'react';
import { userDataContext } from '../context/UserContext';
import axios from 'axios';
import { MdKeyboardBackspace } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
function Customize2() {
  const {userData,backendImage,selectedImage,serverUrl,setUserData}=useContext(userDataContext);
  const [assistantName,setAssistantName]=useState(userData?.assistantName ||"");
  const [loading,setLoading]=useState(false);
  const navigate=useNavigate();

const handleUpdateAssistant=async()=>{
  setLoading(true);
  try {
    let formData=new FormData();
    formData.append("assistantName",assistantName);
    if(backendImage){
      formData.append("assistantImage",backendImage);
    }
    else{
      formData.append("imageUrl",selectedImage);
    }
    const result=await axios.post(`${serverUrl}/api/user/update`,formData,{withCredentials:true});
    setLoading(false);
    // console.log(result.data);
    setUserData(result.data);
    navigate("/");
  } catch (error) {
    setLoading(false);
    console.log("error while updating assistant",error)
  }
}
 return (
    <div className="relative w-full min-h-screen bg-gradient-to-t from-black to-blue-900 flex flex-col justify-center items-center px-4 sm:px-6 md:px-10 py-10">
      
      {/* Back Button */}
      <MdKeyboardBackspace
        className="absolute top-5 left-5 text-white w-6 h-6 sm:w-7 sm:h-7 cursor-pointer hover:text-blue-400 transition-colors duration-200"
        onClick={() => navigate("/customize")}
      />

      {/* Heading */}
      <h1 className="text-white mb-5 text-xl sm:text-2xl md:text-3xl text-center leading-snug">
        Enter Your{" "}
        <span className="text-blue-400 font-semibold">Assistant Name</span>
      </h1>

      {/* Input Field */}
      <input
        type="text"
        placeholder="e.g. Jarvis"
        className="w-full max-w-[600px] h-[50px] sm:h-[55px] md:h-[60px] outline-none border-2 border-white bg-transparent text-white placeholder-gray-300 px-4 sm:px-6 rounded-full text-base sm:text-lg md:text-xl text-center focus:ring-2 focus:ring-blue-400 transition-all duration-300"
        required
        onChange={(e) => setAssistantName(e.target.value)}
        value={assistantName}
      />

      {/* Button */}
      {assistantName && (
        <button
          className="w-[160px] sm:w-[180px] md:w-[200px] h-[45px] sm:h-[50px] text-black font-semibold bg-white rounded-full text-base sm:text-lg md:text-xl mt-6 hover:scale-105 transition-transform duration-300 cursor-pointer"
          disabled={loading}
          onClick={handleUpdateAssistant}
        >
          {!loading ? "Create Assistant" : "Loading..."}
        </button>
      )}
    </div>
  );
}

export default Customize2;
