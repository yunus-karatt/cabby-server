import mongoose, { Schema } from "mongoose";

const cabSchema: Schema = new Schema({
    cabType: {
        type: String
    },
    maxPersons: {
        type: Number
    },
    basePrice: {
        type: Number,
    },
    pricePerKm: {
        type: Number,
    },
    image: {
        type: String,
    },
});

const Cab = mongoose.model("Cab", cabSchema)

export default Cab