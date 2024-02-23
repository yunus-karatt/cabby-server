import { NextFunction, Request, Response } from "express";
import adminCabUseCase from "../../../business/useCase/cabUseCase/adminCabUseCase";


export default{
  addCab:async(req:Request,res:Response,next:NextFunction)=>{
    try {
      res.json(await adminCabUseCase.addCabUsecase(req.body))
    } catch (error) {
      next(error)
    }
  },
  getCabs:async(req:Request,res:Response,next:NextFunction)=>{
    try {
      res.json(await adminCabUseCase.getCabsUsecase())
    } catch (error) {
      next(error)
    }
  }
}