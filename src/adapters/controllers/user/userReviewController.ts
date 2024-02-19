import { NextFunction, Request, Response } from "express";
import reviewUseCase from "../../../business/useCase/reviewUseCase/reviewUseCase";

export default{
  addNewReview:async(req:Request,res:Response,next:NextFunction)=>{
    try {
      res.json(await reviewUseCase.addNewReview(req.body))
     
    } catch (error) {
      next(error)
    }
  }
}