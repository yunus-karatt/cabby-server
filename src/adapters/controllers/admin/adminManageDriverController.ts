import { Request, Response } from "express";
import adminDriverUseCase from "../../../business/useCase/adminUseCase/adminDriverUseCase";

export default {
  getRequests: async (req: Request, res: Response) => {
    try {
      res.json(await adminDriverUseCase.getDriverRequest());
    } catch (error) {
      throw new Error((error as Error).message);
    }
  },
  verifyDriver: async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      res.json(await adminDriverUseCase.verifyDriver(id));
    } catch (error) {
      throw new Error((error as Error).message);
    }
  },
  rejectDriver: async (req: Request, res: Response) => {
    console.log(req.body);
    try {
      res.json(await adminDriverUseCase.rejectDriver(req.body));
    } catch (error) {
      throw new Error((error as Error).message);
    }
  },
  getDrivers: async (
    req: Request<{ query: { page?: string } }>,
    res: Response
  ) => {
    try {
      const page: string | undefined = req.query.page?.toString() ?? "1";
      const pageNumber = parseInt(page);
      res.json(await adminDriverUseCase.getDrivers(pageNumber));
    } catch (error) {
      throw new Error((error as Error).message);
    }
  },
  blockDriver: async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      res.json(await adminDriverUseCase.blockDriver(id));
    } catch (error) {
      throw new Error((error as Error).message);
    }
  },
  searchDriver: async (
    req: Request<{ query: { search: string; page?: string } }>,
    res: Response
  ) => {
    try {
      const search = req.query.search as string;
      const page: string | undefined = req.query.page as string;
      const pageNumber = page ? parseInt(page) : 1;
      res.json(await adminDriverUseCase.searchDriver(search, pageNumber));
    } catch (error) {
      throw new Error((error as Error).message);
    }
  },
};
