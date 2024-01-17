import express from "express";
import connect from "../frameworks/database/mongoDB";
import http from "http";
import * as dotenv from "dotenv";
import {userRoute} from "../frameworks/express/router/userRouter";
import { driverRoutes } from "../frameworks/express/router/driverRouter";
import cors from 'cors';
import { errorHandler, notFound } from "../frameworks/express/middleware/errorMiddleware";
import { adminRoutes } from "../frameworks/express/router/adminRouter";

dotenv.config();
const app = express();
const server = http.createServer(app);

const port = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use('/api',userRoute)
app.use('/api/driver',driverRoutes)
app.use('/api/admin',adminRoutes)

app.use(notFound)
app.use(errorHandler)


if (MONGO_URL) {
  connect(MONGO_URL)
    .then(() => {
      server.listen(port, () => console.log(`Server Running on http://localhost:${port}`));
    })
    .catch((error: Error) => {
      console.log(error);
      console.error("Mongodb Connection Error", error.message);
    });
} else {
  console.log("cannot access the URL from environment");
}


