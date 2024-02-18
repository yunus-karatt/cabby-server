import express from "express";
import connect from "../frameworks/database/mongoDB";
import http from "http";
import * as dotenv from "dotenv";
import {userRoute} from "../frameworks/express/router/userRouter";
import { driverRoutes } from "../frameworks/express/router/driverRouter";
import cors from 'cors';
import { errorHandler, notFound } from "../frameworks/express/middleware/errorMiddleware";
import { adminRoutes } from "../frameworks/express/router/adminRouter";
import cookieParser from 'cookie-parser';
import { socketIOServer } from "../frameworks/socket/socket";
import swaggerUi from 'swagger-ui-express'
import { startReminderCronJob } from "../frameworks/croneJob/reminderCroneJob";

dotenv.config();
const app = express();
const server = http.createServer(app);

const port = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;

app.use(cors({origin:"*",credentials:true}))
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));

app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    swaggerOptions: {
      url: "/swagger.json",
    },
  })
);
 
app.use('/api',userRoute)
app.use('/api/driver',driverRoutes)
app.use('/api/admin',adminRoutes)


socketIOServer(server)
 

if (MONGO_URL) { 
  connect(MONGO_URL)
    .then(() => {
      server.listen(port, () => console.log(`Server Running on http://localhost:${port}`));
      startReminderCronJob()
    })
    .catch((error: Error) => {
      console.log(error);
      console.error("Mongodb Connection Error", error.message);
    });
} else {
  console.log("cannot access the URL from environment");
}
app.use(errorHandler)
app.use(notFound)


