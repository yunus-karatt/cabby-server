import { Request, Response } from "express";
import driverRegistrationUseCase from "../../../business/useCase/driverUseCase/driverRegistrationUseCase";

export default{
  getUserByMobile:async(req:Request,res:Response)=>{
    try {
      res.json(await driverRegistrationUseCase.getDriverByMobile(req.body))
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }
}