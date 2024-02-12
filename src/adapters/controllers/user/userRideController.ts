import { Request, Response } from "express";
import userQuickRideUseCase from "../../../business/useCase/userUseCase/userQuickRideUseCase";
import paymentsUseCase from "../../../business/useCase/userUseCase/paymentsUseCase";

export default { 
  getQuickRideData: async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      res.json(await userQuickRideUseCase.getQuickRideData(id));
    } catch (error) {
      throw new Error((error as Error).message);
    }
  },
  payment: async (req: Request, res: Response) => {
    try {
      const { amount, rideId } = req.body;
      res.json(await paymentsUseCase.razorpayCreateOrder(amount, rideId));
    } catch (error) {
      throw new Error((error as Error).message);
    }
  },
  paymentCapture: async (req: Request, res: Response) => {
    try {
      console.log(req.body);
      const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
        req.body;

      const body = razorpay_order_id + "|" + razorpay_payment_id;

      const isAuthentic = await paymentsUseCase.paymentCapture(body,razorpay_signature);
      if(isAuthentic){
        res.redirect(process.env.CLIENT_BASE_URL)
      }

    } catch (error) {
      throw new Error((error as Error).message);
    }
  },
  getKey: async (req: Request, res: Response) => {
    try {
      res.status(200).json({ key: process.env.RAZORPAY_API_KEY });
    } catch (error) {
      throw new Error((error as Error).message);
    }
  },
};
