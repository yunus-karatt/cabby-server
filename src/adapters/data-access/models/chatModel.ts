import mongoose, { Schema } from "mongoose";

const chatSchema: Schema = new Schema({
  rideId: {
    type: Schema.Types.ObjectId,
    ref: "QuickRide",
  },
  scheduledRideId: {
    type: Schema.Types.ObjectId,
    ref: "ScheduledRide",
  },
  messages: [
    {
      sender: {
        type: String,
        required: true,
      },
      content: {
        type: String,
        required: true,
      },
      timestamp: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

const Chat = mongoose.model("Chat", chatSchema);

export default Chat;
