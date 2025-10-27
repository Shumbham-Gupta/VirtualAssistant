import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { userDataContext } from '../context/UserContext';
import Card from '../components/Card';
import image1 from '../assets/new.jpg';
import image2 from '../assets/image2.jpg';
import image3 from '../assets/authBg.png';
import image4 from '../assets/image4.png';
import image5 from '../assets/image5.png';
import image6 from '../assets/image1.png';
import image7 from '../assets/new3.jpg';
import { RiImageAddLine } from "react-icons/ri";
import { useRef,useState } from 'react';
import { MdKeyboardBackspace } from "react-icons/md";
function Customize() {
  
 const {serverUrl,userData,setUserData,frontendImage, setFrontendImage,backendImage, setBackendImage,selectedImage, setSelectedImage}=useContext(userDataContext);
 const navigate=useNavigate();
  const inputImage=useRef();

  const handleImage=(e)=>{
    const file=e.target.files[0];
    setBackendImage(file);
    setFrontendImage(URL.createObjectURL(file));
    }
    return (
    <div className="relative w-full min-h-screen bg-gradient-to-t from-black to-blue-900 flex flex-col justify-center items-center px-4 sm:px-6 md:px-10 py-10">
      
      {/* Back Button */}
      <MdKeyboardBackspace
        className="absolute top-5 left-5 text-white w-6 h-6 sm:w-7 sm:h-7 cursor-pointer hover:text-blue-400 transition-colors duration-200"
        onClick={() => navigate("/")}
      />

      {/* Title */}
      <h1 className="text-white mb-4 text-xl sm:text-2xl md:text-3xl text-center font-medium">
        Select Your{" "}
        <span className="text-blue-500 font-semibold">Assistant Image</span>
      </h1>

      {/* Image Grid */}
      <div className="w-full sm:w-[90%] max-w-[1000px] flex flex-wrap justify-center items-center gap-5 sm:gap-6 md:gap-8">
        <Card image={image1} />
        <Card image={image2} />
        <Card image={image3} />
        <Card image={image4} />
        <Card image={image5} />
        <Card image={image6} />
        <Card image={image7} />

        {/* Upload Card */}
        <div
          className={`w-[120px] sm:w-[130px] md:w-[140px] h-[180px] sm:h-[190px] md:h-[210px] bg-[#0606a75a] border-2 border-[#4c4cf2a7] rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-blue-700 cursor-pointer hover:border-4 hover:border-white flex justify-center items-center transition-all duration-300 ${
            selectedImage === "input"
              ? "border-4 border-white shadow-2xl shadow-blue-900"
              : ""
          }`}
          onClick={() => {
            inputImage.current.click();
            setSelectedImage("input");
          }}
        >
          {!frontendImage && (
            <RiImageAddLine className="text-white w-6 h-6 sm:w-7 sm:h-7" />
          )}
          {frontendImage && (
            <img
              src={frontendImage}
              alt="Uploaded"
              className="h-full w-full object-cover"
            />
          )}
        </div>

        {/* Hidden File Input */}
        <input
          type="file"
          accept="image/*"
          ref={inputImage}
          hidden
          onChange={handleImage}
        />
      </div>

      {/* Next Button */}
      {selectedImage && (
        <button
          className="w-[110px] sm:w-[130px] md:w-[150px] h-[45px] sm:h-[50px] text-black font-semibold bg-white rounded-full text-base sm:text-lg md:text-xl mt-8 hover:scale-105 transition-transform duration-300 cursor-pointer"
          onClick={() => navigate("/customize2")}
        >
          Next
        </button>
      )}
    </div>
  );
}

export default Customize;
