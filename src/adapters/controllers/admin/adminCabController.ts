import { Request, Response } from "express";
import adminCabUseCase from "../../../business/useCase/cabUseCase/adminCabUseCase";


export default{
  addCab:async(req:Request,res:Response)=>{
    try {
      res.json(await adminCabUseCase.addCabUsecase(req.body))
    } catch (error) {
      res.status(400).json((error as Error).message)
    }
  },
  getCabs:async(req:Request,res:Response)=>{
    try {
      res.json(await adminCabUseCase.getCabsUsecase())
    } catch (error) {
      res.status(400).json((error as Error).message)
    }
  }
}