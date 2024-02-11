import express from 'express';

import userAuth from '../../../adapters/controllers/user/userAuthController'
import userCabController from '../../../adapters/controllers/user/userCabController';
import userRideController from '../../../adapters/controllers/user/userRideController';

export const userRoute=express.Router()


// userRoute.get('/profile',)

userRoute.post("/userexist",userAuth.isuserExist)
userRoute.post("/register",userAuth.registerUser)
userRoute.post("/getuserbymail",userAuth.checkUserWithMail)
userRoute.post("/login",userAuth.loginWithMobileController)
userRoute.post("/logout",userAuth.logoutController)


// cabs
userRoute.get("/list-cabs",userCabController.getCabs)

// Ride
userRoute.get('/getQuickRideData/:id',userRideController.getQuickRideData) 

// payment
userRoute.post('/payment',userRideController.payment)
userRoute.post('/paymentCapture',userRideController.paymentCapture)
userRoute.get('/getkey',userRideController.getKey)