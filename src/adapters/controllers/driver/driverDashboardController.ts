import { NextFunction, Request, Response } from "express"
import driverDashboardUseCase from "../../../business/useCase/driverUseCase/driverDashboardUseCase"
import reviewUseCase from "../../../business/useCase/reviewUseCase/reviewUseCase"

export default{
  getCompletedRideCount:async(req:Request,res:Response,next:NextFunction)=>{
    try {
      const id=req.params.driverId
      res.json(await driverDashboardUseCase.getDashboardData(id))
    } catch (error) {
      next(error)
    }
  },
  getReviewForDriver:async(req:Request,res:Response,next:NextFunction)=>{
    try {
      const driverId=req.params.driverId
      res.json(await reviewUseCase.getReviewForDriver(driverId))
    } catch (error) {
      next(error)
    }
  }
}