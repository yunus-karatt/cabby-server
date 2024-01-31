import { Request, Response } from "express";
import driverProfileUsecase from "../../../business/useCase/driverUseCase/driverProfileUsecase";
import driverRideUsecase from "../../../business/useCase/driverUseCase/driverRideUsecase";

export default {
  changeAvailability: async (req: Request, res: Response) => {
    try {
      res.json(await driverProfileUsecase.changeAvailability(req.body.id));
    } catch (error) {
      console.log(error);
      throw new Error((error as Error).message);
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
};
