import mongoose, { Document, ObjectId, Schema } from "mongoose";
import bcrypt from "bcrypt";

export interface DriverDocument extends Document {
  firstName: string;
  lastName: string;
  mobile: number | null;
  email: string;
  password?: string;
  isBlocked: boolean;
  joinedAt: Date;
  isAvailable: boolean;
  isRiding: boolean;
  driverVerified: boolean;
  vehicleVerified: boolean;
  driverImage: string;
  aadhar: {
    aadharId: string;
    aadharImage: string;
  };
  licence: {
    licenceId: string;
    licenceImage: string;
  };
  vehicleDocuments: {
    registration: {
      registrationId: string;
      registrationImage: string;
    };
    vehicleType: string;
    vehicleImage1: string;
    vehicleImage2: string;
  };
  cabModel: ObjectId;
  rejectedRides: { rideId: string; reason: string }[];
  cancelledRides: { rideId: string; reason: string }[];
  // cityData:{
  //   placeName:string
  //   latitude:number
  //   longitude:number
  // }
  cityCoors:{
    latitude:number,
    longitude:number
  };
  cityName:string
}

const driverSchema: Schema<DriverDocument> = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    default: null,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
  },
  isBlocked: {
    type: Boolean,
    default: false,
  },
  joinedAt: {
    type: Date,
    default: Date.now,
  },
  isAvailable: {
    type: Boolean,
    default: false,
  },
  isRiding: {
    type: Boolean,
    default: false,
  },
  driverVerified: {
    type: Boolean,
    default: false,
  },
  aadhar: {
    aadharId: {
      type: String,
    },
    aadharImage: {
      type: String,
    },
  },
  licence: {
    licenceId: {
      type: String,
    },
    licenceImage: {
      type: String,
    },
  },
  vehicleDocuments: {
    registration: {
      registrationId: {
        type: String,
      },
      registrationImage: {
        type: String,
      },
    },
    vehicleImage1: {
      type: String,
    },
    vehicleImage2: {
      type: String,
    },
  },
  cabModel: {
    type: Schema.Types.ObjectId,
    ref: "Cab",
  },
  rejectedRides: [
    {
      rideId: {
        type: Schema.Types.ObjectId,
        ref: "QuickRide",
      },
      reason: {
        type: String,
      },
    },
  ],
  cancelledRides: [
    {
      rideId: {
        type: Schema.Types.ObjectId,
        ref: "QuickRide",
      },
      reason: {
        type: String,
      },
    },
  ],
  // cityData:{
  //   placeName:{
  //     type:String
  //   },
  //   latitude:{
  //     type:Number
  //   },
  //   longitude:{
  //     type:Number
  //   }
  // }
  cityCoors:{
    latitude:{
      type:Number
    },
    longitude:{
      type:Number
    }
  },
  cityName:{
    type:String
  }

});

driverSchema.pre<DriverDocument>("save", async function (next) {
  if (this.password) {
    if (!this.isModified("password")) {
      next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
});

driverSchema.methods.matchPassword = async function (enterdPassword: string) {
  return await bcrypt.compare(enterdPassword, this.password);
};
driverSchema.index({ "cityCoors": "2dsphere" });
const Driver = mongoose.model("Driver", driverSchema);

export default Driver;
