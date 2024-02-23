import { NextFunction, Request, Response } from "express";
import adminRegistrationUseCase from "../../../business/useCase/adminUseCase/adminAuthUseCase";

export default {
  registerAdmin: async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.json(await adminRegistrationUseCase.registerAdmin(req.body));
    } catch (error) {
      next(error);
    }
  },
  isAdminExist: async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.json(await adminRegistrationUseCase.isAdminExist(req.body));
    } catch (error) {
      next(error);
    }
  },
  loginWithMobile: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { admin, token } = await adminRegistrationUseCase.loginWithMobile(
        req.body
      );
      // console.log({token})
      // res.cookie("adminJWT", token, {
      //   httpOnly: false,
      //   maxAge: 30 * 24 * 60 * 60 * 1000
      // });
      res.json({ admin, token });
    } catch (error) {
      next(error);
    }
  },
  logoutController: async (req: Request, res: Response, next: NextFunction) => {
    res.cookie("adminJWT", "", {
      httpOnly: true,
      expires: new Date(0),
    });
    res.status(200).json({ message: "admin logged out  " });
  },
};
