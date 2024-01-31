import mongoose, { Schema } from "mongoose";

const quickRideSchema: Schema = new Schema({
    driverId: {
        type: String
    },
    userId: {
        type: String
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
    }
});

const QuickRide = mongoose.model("QuickRide", quickRideSchema)

export default QuickRide