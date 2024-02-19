export interface signupData {
  firstName: string;
  lastName: string;
  email: string;
  cityData: {
    placeName: string;
    latitude: number;
    longitude: number;
  };
  mobile: string;
}
export interface EmailInfo {
  to: string | undefined;
  subject: string;
  message: string;
}

export interface MessageInterface{
    sender: string
    content: string
    timestamp: string

}

export interface ChatInterface {
  rideId: string;
  isScheduled: boolean;
  message: MessageInterface
}

export interface ReviewInterface{
  rideId?: string
  scheduledRideId?: string
  userId: string
  driverId:string
  rating:number
  review:string
}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      MONGO_URL: string;
      JWT_SECRET: string;
      RAZORPAY_API_SCECRET: string;
      RAZORPAY_API_KEY: string;
      CLIENT_BASE_URL: string;
      NODEMAILER_EMAIL: string;
      NODEMAILER_PASS: string;
    }
  }
}
export {};
