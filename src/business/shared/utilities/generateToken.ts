import { Response } from "express";
import jwt from "jsonwebtoken";

export const generateToken = (userId: string,res:Response) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  console.log(token)
  res.cookie("jwt", token, {
    httpOnly: true,
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
  return token;
};


