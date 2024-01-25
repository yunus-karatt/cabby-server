import { Request, Response } from "express";
import driverProfileUsecase from "../../../business/useCase/driverUseCase/driverProfileUsecase";

export default{
  changeAvailability:async(req:Request,res:Response)=>{
    try {
      res.json(await driverProfileUsecase.changeAvailability(req.body.id))
    } catch (error) {
      console.log(error)
      throw new Error((error as Error).message)
    }
  }
}