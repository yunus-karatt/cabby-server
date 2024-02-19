import mongoose, { Schema } from "mongoose";

const reviewSchema: Schema = new Schema({
  rideId: {
    type: Schema.Types.ObjectId,
    ref: "QuickRide",
  },
  scheduledRideId: {
    type: Schema.Types.ObjectId,
    ref: "ScheduledRide",
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  driverId:{
    type: Schema.Types.ObjectId,
        ref: "Driver",
  },  
  rating:{
    type:Number
  },
  review:{
    type:String
  }

});

const Review=mongoose.model('Review',reviewSchema)
export default Review