import { NextFunction, Request, Response } from "express"
import adminDashboardUsecase from "../../../business/useCase/adminUseCase/adminDashboardUsecase"

export default{
  getDashboarCounts:async(req:Request,res:Response,next:NextFunction)=>{
    try {
      res.json(await adminDashboardUsecase.getDashboardCounts())
    } catch (error) {
      next(error)
    }
  },
  getAllBookings:async(req:Request,res:Response,next:NextFunction)=>{
    try {
      res.json(await adminDashboardUsecase.getBookings())
    } catch (error) {
      next(error)
    }
  },
  getReports:async(req:Request,res:Response,next:NextFunction)=>{
    try {
      res.json(await adminDashboardUsecase.getReportData())
    } catch (error) {
      next(error)
    }
  },
  getGraphData:async(req:Request,res:Response,next:NextFunction)=>{
    try {
      res.json(await adminDashboardUsecase.getGraphData())
    } catch (error) {
      next(error)
    }
  },
  getFeedbacks:async(req:Request,res:Response,next:NextFunction)=>{
    try {
      res.json(await adminDashboardUsecase.getFeedbacks())
    } catch (error) {
      next(error)
    }
  }
}