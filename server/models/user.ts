import { Document, Schema, model, Types } from "mongoose";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

const secret: string | undefined = process.env.JWT_SECRET;

interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  generateAuthToken(): Promise<string>;
}

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.methods.generateAuthToken = async function (this: IUser) {
  try {
    if (!secret) {
      throw new Error("JWT secret is undefined");
    }

    const token = jwt.sign({ _id: this._id }, secret, {
      expiresIn: "7d",
    });
    return token;
  } catch (error) {
    console.log(error);
    // Handle the error or rethrow if needed
    throw new Error("Token generation failed");
  }
};

// Create the User model
const User = model<IUser>("User", userSchema);

export default User;
