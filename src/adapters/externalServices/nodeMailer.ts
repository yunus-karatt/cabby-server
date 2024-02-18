import { EmailInfo } from "../../business/interfaces/comman";
import nodemailer from 'nodemailer';

export default{
  scheduledRideReminder:async(info:EmailInfo)=>{
    try {
      const {to,subject,message}=info
      const transporter=nodemailer.createTransport({
        service:'Gmail',
        auth:{
          user: process.env.NODEMAILER_EMAIL,
          pass: process.env.NODEMAILER_PASS,
        },
      });
      const mailOptions={
        from:process.env.NODEMAILER_EMAIL,
        to,
        subject,
        html:`<p>${message}</p> `
      }
      await transporter.sendMail(mailOptions)
      return true

    } catch (error) {
      console.log(error)
    }
  }
}