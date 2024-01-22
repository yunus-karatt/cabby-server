import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export const protectDriver=async(req:Request,res:Response,next:NextFunction)=>{
  let token=req.header('Authorization');
  if(token){
    try {
      const decoded=jwt.verify(token,process.env.JWT_SECRET);
      next()
      // const user=await getUser.getUserWithId(decoded.userId)
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, invalid token")
    }
  }else{
    res.status(401)
    throw new Error("Not authorized, no token")
  }
}
   