import express from 'express';

import signup from '../../../adapters/controllers/user/userRegisterController'

export const userRoute=express.Router()

userRoute.post("/signup",signup.signup)
