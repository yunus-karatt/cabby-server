import { Request, Response } from "express";
import adminUserUsecase from "../../../business/useCase/adminUseCase/adminUserUsecase";

export default{
  getUsers:async(req:Request<{query: {page?: string }}>,res:Response)=>{
    try {
      const page: string | undefined = typeof req.query.page === 'string' ? req.query.page : undefined;
      const pageNumber=page ? parseInt(page):1
      res.json(await adminUserUsecase.getUsers(pageNumber))
    } catch (error) {
      throw new Error((error as Error).message)
    }
  },
  blockUser:async(req:Request,res:Response)=>{
    try {
      const id=req.params.id
      res.json(await adminUserUsecase.blockUser(id))
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }
}