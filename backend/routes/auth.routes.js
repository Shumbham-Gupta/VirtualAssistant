import express from "express";
import { Login, logOut, signup } from "../controllers/auth.controllers.js";

const authRouter=express.Router();
authRouter.post("/signup",signup)
authRouter.post("/signin",Login)
authRouter.get("/logout",logOut)
export default authRouter;