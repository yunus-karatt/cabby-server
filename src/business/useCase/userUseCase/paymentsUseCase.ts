import Razorpay from "razorpay";
import crypto from "crypto";
export default {
  razorpayCreateOrder: async (amount: number, receipt: string) => {
    try {

      const razorpay = new Razorpay({
        key_id: process.env.RAZORPAY_API_KEY,
        key_secret: process.env.RAZORPAY_API_SCECRET,
      });
      console.log({amount})
      const options = {
        amount,
        currency: "INR",
        receipt,
        payment_capture: 1,
      };
      const order = await razorpay.orders.create(options);
      console.log({order})
      return { order };
    } catch (error) {
      console.log({error})
      throw new Error((error as Error).message);
    }
  },
  paymentCapture: async (body: string, razorpay_signature: string) => {
    try {
      const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_API_SCECRET)
        .update(body.toString())
        .digest("hex");
      const isAuthentic = expectedSignature === razorpay_signature;
      return isAuthentic;
    } catch (error) {
      console.log({error})

      throw new Error((error as Error).message);
    }
  },
};
