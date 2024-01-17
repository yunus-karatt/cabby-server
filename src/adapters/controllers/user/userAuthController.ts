import { Request, Response } from "express";
import userAuthUseCase from "../../../business/useCase/userUseCase/userAuthUseCase";

export default {
  registerUser: async (req: Request, res: Response) => {
    try {
      const { user, token } = await userAuthUseCase.registerUser(
        req.body
      );
      res.cookie("userJWT", token, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });
      return res.json(user);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  },

  loginWithMobileController:async(req: Request, res: Response)=>{
    try {
      
      const {user,token}=await userAuthUseCase.loginWithMobile(req.body)
      res.cookie("userJWT", token, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });
      return res.json(user);

    } catch (error) {
      throw new Error ((error as Error).message)
    }
  },

  checkUserWithMail: async (req: Request, res: Response) => {
    try {
      const { mail } = req.body;
      res.json(await userAuthUseCase.checkUserExistWithMail(mail));
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  },

  isuserExist: async (req: Request, res: Response) => {
    try {
      res.json(await userAuthUseCase.checkUserExist(req.body));
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  },
  logoutController:async(req:Request,res:Response)=>{
    res.cookie("userJWT", "", {
      httpOnly: true,
      expires: new Date(0),
    });
    res.status(200).json({ message: "admin logged out  " });
  }
};
