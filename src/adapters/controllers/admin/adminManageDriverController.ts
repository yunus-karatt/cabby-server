import { NextFunction, Request, Response } from "express";
import adminDriverUseCase from "../../../business/useCase/adminUseCase/adminDriverUseCase";

export default {
  getRequests: async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.json(await adminDriverUseCase.getDriverRequest());
    } catch (error) {
      next(error);
    }
  },
  verifyDriver: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      res.json(await adminDriverUseCase.verifyDriver(id));
    } catch (error) {
      next(error);
    }
  },
  rejectDriver: async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body);
    try {
      res.json(await adminDriverUseCase.rejectDriver(req.body));
    } catch (error) {
      next(error);
    }
  },
  getDrivers: async (
    req: Request<{ query: { page?: string } }>,
    res: Response,
    next:NextFunction
  ) => {
    try {
      const page: string | undefined = req.query.page?.toString() ?? "1";
      const pageNumber = parseInt(page);
      res.json(await adminDriverUseCase.getDrivers(pageNumber));
    } catch (error) {
      next(error);
    }
  },
  blockDriver: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      res.json(await adminDriverUseCase.blockDriver(id));
    } catch (error) {
      next(error);
    }
  },
  searchDriver: async (
    req: Request<{ query: { search: string; page?: string } }>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const search = req.query.search as string;
      const page: string | undefined = req.query.page as string;
      const pageNumber = page ? parseInt(page) : 1;
      res.json(await adminDriverUseCase.searchDriver(search, pageNumber));
    } catch (error) {
      next(error);
    }
  },
};
