import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import connectDb from './config/db.js';
import authRouter from './routes/auth.routes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import userRouter from './routes/user.routes.js';
import geminiResponse from './gemini.js';


const app = express();
app.use(cors({
  origin: 'http://localhost:5173', // Replace with your frontend URL
  credentials: true, // Allow cookies to be sent
}));
const PORT = process.env.PORT || 5000; // Default to 5000 if PORT is not set
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth",authRouter);
app.use("/api/user",userRouter);


app.get('/', async (req, res) => {
  let prompt=req.query.prompt;
  let data=await geminiResponse(prompt);
  res.json(data);
});

app.listen(PORT, () => {
  connectDb(); // Connect to the database when the server starts
  console.log(`Server is running on port ${PORT}`);
});