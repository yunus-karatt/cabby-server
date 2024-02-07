import { Request, Response } from "express";
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
  }
}