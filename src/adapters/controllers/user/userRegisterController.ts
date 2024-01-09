import { Request, Response } from "express";
import userRegistrationUseCase from "../../../business/useCase/userUseCase/userRegistrationUseCase";



export default{
  signup:async (req:Request,res:Response)=>{
      try{
        
        res.json(await userRegistrationUseCase.registerUser(req.body))
      }catch(error){
        res.status(500).json({error:(error as Error).message})
      }
  }
}