import mongoose, { Schema } from "mongoose";

const scheduledRideSchema: Schema = new Schema({
    driverId: {
        type: Schema.Types.ObjectId,
        ref: "Driver",
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    sourceCoordinates: {
        latitude:{
            type:Number
        },
        longitude:{
            type:Number
        }
    },
    destinationCoordinates: {
        latitude:{
            type:Number
        },
        longitude:{
            type:Number
        }
    },
    sourceLocation: {
        type: String,
    },
    destinationLocation: {
        type: String,
    },
    distance:{
        type:Number
    },
    duration:{
        type:Number
    },
    price:{
        type:Number
    },
    date:{
        type:Date,
        default:Date.now()
    },
    status:{
        type:String,
        default:"Confirmed"
    },
    feedback:{
        type:String,
    },
    rating:{
        type:Number
    },
    otp:{
        type:Number
    },
    pickUpDate:{
      type:Date,
    },
    cabId:{
        type: Schema.Types.ObjectId,
        ref: "Cab",
      },
});

const ScheduledRide = mongoose.model("ScheduledRide", scheduledRideSchema)

export default ScheduledRide