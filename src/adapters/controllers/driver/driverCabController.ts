import { Request, Response } from "express";
import driverCabUseCase from "../../../business/useCase/cabUseCase/driverCabUseCase";

export default{
  getCabs:async(req:Request,res:Response)=>{
    try {
      res.json(await driverCabUseCase.getCabs())
    } catch (error) {
      res.status(400).json((error as Error).message)
    }
  }
}