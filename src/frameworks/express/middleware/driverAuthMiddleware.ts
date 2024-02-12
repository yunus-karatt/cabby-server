import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export const protectDriver=async(req:Request,res:Response,next:NextFunction)=>{
  let token=req.header('Authorization');
  if(token){
    try {
      const decoded=jwt.verify(token,process.env.JWT_SECRET);
      next()
      // const user=await getUser.getUserWithId(decoded.userId)
    } catch (err) {
      res.status(401);
      const error= new Error("Not authorized, invalid token")
      next(error)
    }
  }else{
    res.status(401)
    const error= new Error("Not authorized, no token")
    next(error)
  }
}
   