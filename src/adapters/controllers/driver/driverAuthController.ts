import { Request, Response } from "express";
import driverAuthUseCase from "../../../business/useCase/driverUseCase/driverAuthUseCase";
import driverRideUsecase from "../../../business/useCase/driverUseCase/driverRideUsecase";

export default {
  getDriverByMobile: async (req: Request, res: Response) => {
    try {
      res.json(await driverAuthUseCase.getDriverByMobile(req.body));
    } catch (error) {
      throw new Error((error as Error).message);
    }
  },
  getDriverByMail: async (req: Request, res: Response) => {
    try {
      res.json(await driverAuthUseCase.getDriverByMail(req.body));
    } catch (error) {
      res.status(400).json((error as Error).message);
    }
  },
  registerController: async (req: Request, res: Response) => {
    try {
      res.json(await driverAuthUseCase.registerDriver(req.body));
    } catch (error) {
      res.status(400).json((error as Error).message);
    }
  },
  loginwithMobile: async (req: Request, res: Response) => {
    try {
      res.json(await driverAuthUseCase.loginWithMobile(req.body));
    } catch (error) {
      res.status(400).json((error as Error).message);
    }
  },
  logout: async (req: Request<{id?:string}>, res: Response) => {
    const id:string= req.query.id as string;
    console.log({ id });
      await driverRideUsecase.setOfflineUseCase(id); 
    
    res.status(200).json({ message: "driver logged out  " });
  },
  registerVehicle: async (req: Request, res: Response) => {
    try {
      res.json(await driverAuthUseCase.updateDriverDetails(req.body));
    } catch (error) {
      res.status(400).json((error as Error).message);
    }
  },
};
