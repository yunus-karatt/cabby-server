import mongoose from "mongoose";

async function connect(mongoURL:string) {
  try {
    await mongoose.connect(mongoURL) 
    console.log('db connected')
  } catch (error) {
    console.error("Error connecting to the database",error)
  }
}

export default connect;