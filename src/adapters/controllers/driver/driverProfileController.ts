import { NextFunction, Request, Response } from "express";
import driverProfileUsecase from "../../../business/useCase/driverUseCase/driverProfileUsecase";
import driverRideUsecase from "../../../business/useCase/driverUseCase/driverRideUsecase";

export default {
  changeAvailability: async (req: Request, res: Response,next:NextFunction) => {
    try {
      console.log(req.body.id)
      res.json(await driverProfileUsecase.changeAvailability(req.body.id));
    } catch (error) {
      next(error)
    }
  },
  setOfflineProfileController: async (
    req: Request<{ id?: string }>,
    res: Response
  ) => {
    try {
      const id: string | undefined = req.query.id as string;
      res.json(await driverRideUsecase.setOfflineUseCase(id));
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }, 
  isOnline:async(req:Request,res:Response,next:NextFunction)=>{
    try {
      const id=req.params.id
      
      res.json(await driverRideUsecase.isOnline(id))
    } catch (error) {
      next(error)
    }
  }
};
