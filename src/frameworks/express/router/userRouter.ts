import express from 'express';

import signup from '../../../adapters/controllers/user/userRegisterController'

export const userRoute=express.Router()

userRoute.get('/',(req,res)=>res.send("hello world"))

userRoute.post("/userexist",signup.isuserExist)
userRoute.post("/register",signup.registerUser)