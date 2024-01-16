import { Request, Response } from "express";
import userRegistrationUseCase from "../../../business/useCase/userUseCase/userRegistrationUseCase";

export default {
  isuserExist: async (req: Request, res: Response) => {
    try {
      res.json(await userRegistrationUseCase.checkUserExist(req.body));
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  },
  registerUser:async (req:Request,res:Response)=>{
    try {
    return  res.json(await userRegistrationUseCase.registerUser(req.body,res))
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }
};
