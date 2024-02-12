import mongoose, { Schema } from "mongoose";

const quickRideSchema: Schema = new Schema({
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
    }
});

const QuickRide = mongoose.model("QuickRide", quickRideSchema)

export default QuickRide