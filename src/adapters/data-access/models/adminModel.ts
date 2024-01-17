import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcrypt";
import { timeStamp } from "console";

export interface AdminDocument extends Document {
  name: string;
  mobile: string;
  email: string;
  password: string;
}

const adminSchema: Schema<AdminDocument> = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

adminSchema.pre<AdminDocument>("save", async function (next) {
  if (this.password) {
    if (this.password) {
      if (!this.isModified("password")) {
        next();
      }
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
    }
  }
});
adminSchema.methods.matchPassword = async function (enterdPassword: string) {
  return await bcrypt.compare(enterdPassword, this.password);
};

export const Admin = mongoose.model("Admin", adminSchema);
