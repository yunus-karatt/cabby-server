import { NextFunction, Request, Response } from "express";
import {Error as MongooseError } from "mongoose";


export const notFound=(req:Request,res:Response,next:NextFunction)=>{
  const error=new Error(`Not Found - ${req.originalUrl}`)
  res.status(404)
  next(error)
}

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;
  console.log({errorHandler:message})
  if (err instanceof MongooseError.CastError) {
    if (err.name === "CastError" && err.kind === "ObjectId") {
      statusCode=404;
      message="Resource not found"
    }
  }
  res.status(statusCode).json({
    message 
  })
};
