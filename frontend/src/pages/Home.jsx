import React from 'react'
import { useContext } from 'react';
import { userDataContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import aiImg from '../assets/ai.gif'
import userImg from '../assets/user.gif'
import { Menu, X } from 'lucide-react';
import axios from 'axios';
function Home() {
  const {userData,serverUrl,setUserData,getGeminiResponse}=useContext(userDataContext);
  const navigate=useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
const [listening,setListening]=useState(false);
const [userText,setUserText]=useState("");
const [aiText,setAiText]=useState("");
const isSpeakingRef=useRef(false);
const isRecognizingRef=useRef(false);
const recognitionRef=useRef(null);
const synth=window.speechSynthesis

  const handleLogout= async ()=>{
    try {
      
      const result= await axios.get(`${serverUrl}/api/auth/logout`,{
        withCredentials:true
      });
      setUserData(null);
      navigate("/signin");
    } catch (error) {
      setUserData(null);
      console.log(error);
      
    }
  }
const startRecognition=()=>{
  if(!isSpeakingRef.current && !isRecognizingRef.current){
  try {
    recognitionRef.current?.start();
    console.log("Recognition started")
  } catch (error) {
    if(error.name !=="InvalidStateError"){
      console.error("Start error",error);
    }
  }
}
}
 const speak = (text) => {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang='hi-IN';
  const voices=window.speechSynthesis.getVoices();
  const hindiVoice=voices.find(v=>v.lang==='hi-IN');
  if(hindiVoice){
    utterance.voice=hindiVoice;
  }
  isSpeakingRef.current=true;
  utterance.onend=()=>{
    setAiText("")
    isSpeakingRef.current=false;
    setTimeout(()=>{
      startRecognition();
    },800)
  
  }
  synth.cancel()
  synth.speak(utterance);
};

const handleCommand = (data) => {

  const { type, userInput, response } = data;
  speak(response);

  if(type=='ai_response' || !type){
    speak(response);
    return;
  }

  if (type === "google_search") {
    const query = encodeURIComponent(userInput);
    window.open(`https://www.google.com/search?q=${query}`, "_blank");
  }

  if (type === "calculator_open") {
    window.open(`https://www.google.com/search?q=calculator`, "_blank");
  }

  if (type === "instagram_open") {
    window.open(`https://www.instagram.com/`, "_blank");
  }

  if (type === "facebook_open") {
    window.open(`https://www.facebook.com/`, "_blank");
  }

  if (type === "weather_show") {
    window.open(`https://www.google.com/search?q=weather`, "_blank");
  }

  if (type === "youtube_search" || type === "youtube_play") {
    const query = encodeURIComponent(userInput);
    window.open(`https://www.youtube.com/results?search_query=${query}`, "_blank");
  }
};

useEffect(()=>{
const SpeechRecognition=window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition= new SpeechRecognition();
recognition.continuous=true;
recognition.lang="en-US"
recognition.interimResults = false;
recognitionRef.current=recognition;

let isMounted=true;
 
const startTimeout=setTimeout(()=>{
  if(isMounted && !isSpeakingRef.current && !isRecognizingRef.current){
    try {
      recognition.start();
      console.log("Recognition started")
    } catch (e) {
      if(e.name !=="InvalidStateError"){
        console.error(e)
      }
    }
  }
},1000)
recognition.onstart=()=>{
  
  isRecognizingRef.current=true;
  setListening(true);
}

recognition.onend=()=>{
isRecognizingRef.current=false;
setListening(false);
if(isMounted && !isSpeakingRef.current){
  setTimeout(()=>{
    if(isMounted){
      try{
        recognition.start();
        console.log("recognition started");
      }
      catch (e){
if(e.name !=="InvalidStateError"){
  console.error(e);
}
      }
    }
  },1000)
}
}

recognition.onerror=(event)=>{
  console.warn("Recognition error:",event.error);
  isRecognizingRef.current=false;
  setListening(false);
  if(event.error !== "aborted" && !isSpeakingRef.current &&isMounted){
    setTimeout(() => {
      if(isMounted){
        try{
          recognition.start();
          console.log("Recognition started after error")
        }
        catch(e){
          if(e.name !=="InvalidStateError"){
            console.error(e);
          }
        }
      }
    }, 1000);
  }
}


recognition.onresult= async (e)=>{
const transcript=e.results[e.results.length-1][0].transcript.trim();
console.log("heard :" +transcript);

if(transcript.toLowerCase().includes(userData.assistantName.toLowerCase())){
  setAiText("")
setUserText(transcript)
  recognition.stop()
  isRecognizingRef.current=false; 
  setListening(false);
  
  const data = await getGeminiResponse(transcript);
handleCommand(data);
setAiText(data.response);
setUserText("")

}

}

// window.speechSynthesis.onvoiceschanged=()=>{
//   const greeting = new SpeechSynthesisUtterance(`Hello ${userData.name},what can I help you with ?`);
//   greeting.lang="hi-IN"; 
//   window.speechSynthesis.speak(greeting);
// }
 setTimeout(() => {
    if (userData?.assistantName) {
      const greeting = new SpeechSynthesisUtterance(
        `Hello, I'm ${userData.assistantName}, your virtual assistant. How can I help you?`
      );
      greeting.lang = "hi-IN";
      const voices = window.speechSynthesis.getVoices();
      const englishVoice = voices.find(v => v.lang === 'hi-IN');
      if (englishVoice) greeting.voice = englishVoice;
      window.speechSynthesis.speak(greeting);
    }
  }, 1500);

return ()=>{
  isMounted=false;
  clearTimeout(startTimeout);
  recognition.stop();
  setListening(false);
  isRecognizingRef.current=false;
  
}


},[])

  return (
    <div className="w-full min-h-screen bg-gradient-to-t from-black to-blue-900 flex flex-col justify-center items-center gap-6 px-4 relative">
      
      {/* Hamburger / Menu Buttons */}
      <div className="absolute top-4 right-4">
        {/* Hamburger icon (mobile only) */}
        <button
          className="sm:hidden text-white p-2 rounded-md hover:bg-blue-800 transition"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Desktop buttons */}
        <div className="hidden sm:flex flex-col gap-2">
          <button
            className="min-w-[100px] h-[36px] text-black font-semibold bg-white rounded-full text-[16px] px-4 hover:bg-gray-200 transition"
            onClick={handleLogout}
          >
            Log Out
          </button>

          <button
            className="min-w-[120px] h-[36px] text-black font-semibold bg-white rounded-full text-[16px] px-4 hover:bg-gray-200 transition"
            onClick={() => navigate("/customize")}
          >
            Customize
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="absolute top-16 right-4 bg-white text-black rounded-lg shadow-lg flex flex-col p-3 z-10 sm:hidden">
          <button
            className="py-2 px-4 text-left font-semibold hover:bg-gray-200 rounded-md"
            onClick={() => {
              handleLogout();
              setMenuOpen(false);
            }}
          >
            Log Out
          </button>
          <button
            className="py-2 px-4 text-left font-semibold hover:bg-gray-200 rounded-md"
            onClick={() => {
              navigate("/customize");
              setMenuOpen(false);
            }}
          >
            Customize
          </button>
        </div>
      )}

      {/* Assistant Image Card */}
      <div className="w-[100px] h-[120px] sm:w-[130px] sm:h-[160px] md:w-[190px] md:h-[240px] flex justify-center items-center overflow-hidden rounded-3xl shadow-lg border-2 border-white mt-8 sm:mt-10 md:mt-8 transition-all duration-300">
  <img
    src={userData?.assistantImage}
    alt="Assistant"
    className="h-full w-full object-cover"
  />
</div>
      

      {/* Assistant Name */}
      <h1 className="text-white text-[17px] sm:text-[18px] font-semibold text-center">
        I'm {userData?.assistantName}, Your Virtual Assistant
      </h1>

      {/* AI/User Image */}
      {!aiText && (
        <img
          src={userImg}
          alt="User speaking"
          className="w-[100px] sm:w-[100px] md:w-[150px] transition-all duration-300"
        />
      )}
      {aiText && (
        <img
          src={aiImg}
          alt="AI responding"
          className="w-[100px] sm:w-[100px] md:w-[150px] transition-all duration-300"
        />
      )}

      {/* Display text */}
      <h1 className="text-white text-[15px] sm:text-[17px] font-bold text-center px-3 break-words mt-2">
        {userText ? userText : aiText ? aiText : null}
      </h1>
    </div>
  );
}

export default Home;
