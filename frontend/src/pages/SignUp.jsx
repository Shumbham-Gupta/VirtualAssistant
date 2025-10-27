import React from "react";
import bg from "../assets/authBg.png";
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useContext } from "react";
import { userDataContext } from "../context/UserContext";
import axios from "axios";


function SignUp() {
  const [showPassword, setShowPassword] =useState(false);
  const {serverUrl,userData,setUserData}=useContext(userDataContext);
  const navigate=useNavigate();
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [loading,setLoading]=useState(false);
  const [password,setPassword]=useState("");
  const [err,setErr]=useState("");

const handleSignUp=async (e)=>{
  e.preventDefault();
  setErr("");
  setLoading(true);
  try {
    let result= await axios.post(`${serverUrl}/api/auth/signup`,{
      name,
      email,  
      password
    },{withCredentials:true});
    setUserData(result.data);
    setLoading(false);
    navigate('/customize');
    }
    catch (error) {
    console.log("error while signup",error)
setLoading(false);
setUserData(null);
    setErr(error.response.data.message); 
  }

}

return (
    <div
      className="w-full min-h-screen bg-cover bg-center flex justify-center items-center px-4 sm:px-6 md:px-10"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <form
        className="w-full sm:w-[90%] md:w-[500px] bg-[#3a5cbb12] backdrop-blur-md shadow-lg shadow-black flex flex-col items-center justify-center gap-5 px-4 sm:px-6 md:px-8 py-8 rounded-2xl"
        onSubmit={handleSignUp}
      >
        <h1 className="text-white text-2xl sm:text-3xl font-semibold text-center mb-4">
          Register to <span className="text-blue-400">Virtual Assistant</span>
        </h1>

        <input
          type="text"
          placeholder="Enter your name"
          className="w-full h-[50px] sm:h-[55px] md:h-[60px] outline-none border-2 border-white bg-transparent text-white placeholder-gray-300 px-4 sm:px-5 rounded-full text-base sm:text-lg"
          required
          onChange={(e) => setName(e.target.value)}
          value={name}
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full h-[50px] sm:h-[55px] md:h-[60px] outline-none border-2 border-white bg-transparent text-white placeholder-gray-300 px-4 sm:px-5 rounded-full text-base sm:text-lg"
          required
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />

        <div className="w-full h-[50px] sm:h-[55px] md:h-[60px] border-2 border-white bg-transparent text-white rounded-full text-base sm:text-lg relative flex items-center">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full h-full outline-none bg-transparent text-white placeholder-gray-300 px-4 sm:px-5 rounded-full"
            required
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          {showPassword ? (
            <IoEye
              className="absolute right-5 w-6 h-6 text-white cursor-pointer"
              onClick={() => setShowPassword(false)}
            />
          ) : (
            <IoEyeOff
              className="absolute right-5 w-6 h-6 text-white cursor-pointer"
              onClick={() => setShowPassword(true)}
            />
          )}
        </div>

        {err && <p className="text-red-500 text-sm sm:text-base">*{err}</p>}

        <button
          className="min-w-[120px] h-[45px] sm:h-[50px] text-black font-semibold bg-white rounded-full text-base sm:text-lg mt-2 hover:bg-gray-200 transition-all duration-300"
          disabled={loading}
        >
          {loading ? "Loading..." : "Sign Up"}
        </button>

        <p
          className="text-white text-sm sm:text-base text-center mt-2 cursor-pointer"
          onClick={() => navigate("/signin")}
        >
          Already have an account?{" "}
          <span className="text-blue-400 font-semibold">Sign In</span>
        </p>
      </form>
    </div>
  );
}

export default SignUp;
