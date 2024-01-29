import { Request, Response } from "express"
import userCabUseCase from "../../../business/useCase/cabUseCase/userCabUseCase"

export default{
  getCabs:async(req:Request,res:Response)=>{
    try {
      res.json(await userCabUseCase.getCabs())
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }
}