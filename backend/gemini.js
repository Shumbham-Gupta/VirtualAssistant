// import axios from "axios";
// const geminiResponse = async (command,assistantName,userName) => {

//   try {
//     const apiUrl = process.env.GEMINI_API_URL;
//     const prompt=`You are a virtual assistant named ${assistantName}
//     created by ${userName}.
    
//   You are not Google. You will now behave like a voice-enabled assistant.

//   Your task is to understand the user's natural language input and respond with a json object like this:
//   {
//   "type":"general"|"google_search"|"youtube_search"|"wikipedia_search"|"instagram_search"|facebook_search"|"twitter_search"|"linkedin_search"|"snapchat_search"|"get_time"|"get_date"|"get_day"|"get_month"|"youtube_play"|"general"|"calculator_open"|instagram_open"|"facebook_open"|"twitter_open"|"linkedin_open"|"snapchat_open"|"weather_show",
//   "userInput":"<The user's original input>"{only remove your name from userinput if exists} and agar kisi ne youtube ya google pe search karne ko bola hai to userinput me ye bhi mention karna hai ki 'search on youtube' ya 'search on google',
//   "response":"<a short spoken response to read out loud to the user>"
//   }
    
//   Instructions:

//   -"type":determine the intent of the user.
//   -"userinput":original sentence the user said to you.
//   -"response":A short voice-friendly answer ,e.g."Sure,playing it now,"here is what I found",
// "today is monday",etc.

// Type meanings:
// - "general":if it's a factual or informational question.
// - "google_search":if user wants to search something on google.
// - "youtube_search":if user wants to search something on youtube.
// - "youtube_play":if user wants to directly play a video or song.
// - "calculator_open":if user wants to open a calculator.
// - "instagram_open":if user wants to open instagram.
// - "facebook_open":if user wants to open facebook.
// - "weather_show":if user wants to know weather.
// - "get_time":if user asks for current time.
// - "get_date":if user asks for today's data.
// - "get_day":if user asks what day it is.
// - "get_month":if user asks for the current month. 

// Important:
// -Use ${userName} agar koi puchhe ki tumhe kisne banaya hai.
// -Only respond in json obejct, nothing else.

// now your userInput- ${command}`;

//     const result = await axios.post(apiUrl,{
//       "contents": [
//       {
//         "parts": [
//           {
//             "text": prompt
//           }
//         ]
//       }
//     ]
//     },{
//   headers: {
//     "Content-Type": "application/json",
//     "x-goog-api-key": process.env.GEMINI_API_KEY
//   }
// })
//     return result.data.candidates[0].content.parts[0].text;
//   } catch (error) {
//     console.log("Error in Gemini API:", error);
//   }
// }

// export default geminiResponse;
import axios from "axios";

const geminiResponse = async (command, assistantName, userName) => {
  try {
    const apiUrl = process.env.GEMINI_API_URL;

    const prompt = `
You are a virtual assistant named ${assistantName}, created by ${userName}.
You are not Google. You behave like a voice-enabled personal assistant.

Your job is to understand the user's input and respond ONLY with a valid JSON object in the exact format below:
{
  "type": "ai_response" | "general" | "google_search" | "youtube_search" | "youtube_play" | 
           "wikipedia_search" | "instagram_search" | "facebook_search" | "twitter_search" | 
           "linkedin_search" | "snapchat_search" | "calculator_open" | "instagram_open" | 
           "facebook_open" | "twitter_open" | "linkedin_open" | "snapchat_open" | 
           "weather_show" | "get_time" | "get_date" | "get_day" | "get_month",
  "userInput": "<The user's original input, excluding your name if mentioned>",
  "response": "<A short, natural, spoken-style reply>"
}

🔹 Rules:
1. If the user asks a factual question (like “Who is the President of India?” or “What is AI?”), 
   → use "type": "ai_response" and provide a short factual answer directly.
2. Use "google_search" ONLY if the user explicitly says things like “search on Google” or “find on Google”.
3. Use "youtube_search" or "youtube_play" for YouTube-related commands.
4. Use "calculator_open", "facebook_open", "instagram_open", "twitter_open", etc. only when clearly mentioned.
5. For general small talk or greetings (like “hi”, “how are you”), use "ai_response" and reply casually.
6. Always include the user's input in "userInput".
7. Never output markdown, explanations, or text outside JSON.
8. If asked “Who made you?”, respond with "${userName}".
9. If the user asks for time, date, day, or month, use "get_time", "get_date", etc. respectively.

Now, analyze this user input and reply with ONLY a JSON object:
"${command}"
`;

    const result = await axios.post(
      apiUrl,
      {
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": process.env.GEMINI_API_KEY,
        },
      }
    );

    // Safely extract the model's response
    return result.data?.candidates?.[0]?.content?.parts?.[0]?.text || null;
  } catch (error) {
    console.error("Error in Gemini API:", error);
    return JSON.stringify({
      type: "ai_response",
      userInput: command,
      response: "I'm sorry, I couldn't process that right now.",
    });
  }
};

export default geminiResponse;
