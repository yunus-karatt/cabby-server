import { Request, Response } from "express";
import driverUserUseCase from "../../../business/useCase/driverUseCase/driverUserUseCase";

export default{
  getUserWithId:async(req:Request,res:Response)=>{
    try {
      const id=req.params.id
      res.json(await driverUserUseCase.getUserInfobyId(id))
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }
}