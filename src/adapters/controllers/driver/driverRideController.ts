import { NextFunction, Request, Response } from "express";
import driverRideUsecase from "../../../business/useCase/driverUseCase/driverRideUsecase";

export default{
  postRejectionController:async(req:Request,res:Response)=>{
    try {
      res.json(await driverRideUsecase.postRejectionReasonUsecase(req.body))
    } catch (error) {
      throw new Error((error as Error).message)
    }
  },
  verifyOtpContr:async(req:Request,res:Response)=>{
    try {
      const {rideId,OTP}=req.body
      res.json(await driverRideUsecase.verifyOTPUseCase(rideId,OTP))
    } catch (error) {
      throw new Error((error as Error).message)
    }
  },
  listScheduledRides:async(req:Request,res:Response,next:NextFunction)=>{
    try {
      const id=req.params.id
      res.json(await driverRideUsecase.listScheduledRides(id))
    } catch (error) {
      next(error)
    }
  },
  getScheduledRideByRideId:async(req:Request,res:Response,next:NextFunction)=>{
    try {
      const id=req.params.rideId
      res.json(await driverRideUsecase.getScheduledRideByRideId(id))
    } catch (error) {
      next(error)
    }
  },
  generateScheduledRideOTP:async(req:Request,res:Response,next:NextFunction)=>{
    try {
      const id=req.params.rideId
      res.json(await driverRideUsecase.generateScheduledRideOTP(id))
    } catch (error) {
      next(error)
    }
  },

}