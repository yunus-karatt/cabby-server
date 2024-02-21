import { NextFunction, Request, Response } from "express"
import driverDashboardUseCase from "../../../business/useCase/driverUseCase/driverDashboardUseCase"

export default{
  getCompletedRideCount:async(req:Request,res:Response,next:NextFunction)=>{
    try {
      const id=req.params.driverId
      res.json(await driverDashboardUseCase.getDashboardData(id))
    } catch (error) {
      next(error)
    }
  }
}