import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcrypt";

interface UserDocument extends Document {
  name: string;
  mobile: number | null;
  email: string;
  password?: string;
  isBlocked: boolean;
  joinedAt: Date;
  RideDetails: {
    completedRides: number;
    cancelledRides: number;
  };
}

const userSchema: Schema<UserDocument> = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    mobile: {
      type: Number,
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
    RideDetails: {
      completedRides: {
        type: Number,
        default: 0,
      },
      cancelledRides: {
        type: Number,
        default: 0,
      },
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre<UserDocument>("save", async function (next) {
  if (this.password) {
    if (!this.isModified("password")) {
      next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
});

userSchema.methods.matchPassword = async function (enterdPassword: string) {
  return await bcrypt.compare(enterdPassword, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
