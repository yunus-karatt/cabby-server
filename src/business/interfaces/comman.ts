export interface signupData {
  firstName: string;
  lastName: string;
  email: string;
}



declare global{
  namespace NodeJS{
    interface ProcessEnv{
      PORT: string;
      MONGO_URL: string;
      JWT_SECRET: string;
      RAZORPAY_API_SCECRET:string;
      RAZORPAY_API_KEY:string;
      CLIENT_BASE_URL:string;
    }
  }
}
export{}