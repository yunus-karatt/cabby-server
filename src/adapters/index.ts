import express from "express";
import connect from "../frameworks/database/mongoDB";
import http from "http";
import * as dotenv from "dotenv";
import {userRoute} from "../frameworks/express/router/userRouter";

dotenv.config();
const app = express();
const server = http.createServer(app);

const port = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use('/api',userRoute)

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


