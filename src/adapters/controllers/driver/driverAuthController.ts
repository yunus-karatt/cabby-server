import { Request, Response } from "express";
import driverAuthUseCase from "../../../business/useCase/driverUseCase/driverAuthUseCase";

export default{
  getDriverByMobile:async(req:Request,res:Response)=>{
    try {
      res.json(await driverAuthUseCase.getDriverByMobile(req.body))
    } catch (error) {
      throw new Error((error as Error).message)
    }
  },
  registerController:async(req:Request,res:Response)=>{
    try {
      res.json(await driverAuthUseCase.registerDriver(req.body))
    } catch (error) {
      res.status(400).json((error as Error).message)
      
    }
  },
  loginwithMobile:async (req:Request,res:Response)=>{
    try {
      const {token,driverData}=await driverAuthUseCase.loginWithMobile(req.body)
      res.cookie("driverJWT", token, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });
      res.json(driverData)
    } catch (error) {
      res.status(400).json((error as Error).message)
    }
  },
  logout:async(req:Request,res:Response)=>{
    res.cookie("driverJWT", "", {
      httpOnly: true,
      expires: new Date(0),
    });
    res.status(200).json({ message: "driver logged out  " });
  },
  registerVehicle:async (req:Request,res:Response)=>{
    
    try {
      res.json(await driverAuthUseCase.updateDriverDetails(req.body))
    } catch (error) {
      res.status(400).json((error as Error).message)
    }
  }
}