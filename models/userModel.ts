import mongoose from "mongoose"
import * as z from "zod"

const User = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    trim: true,
    unique:true,
    lowercase: true
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  role: {
    type:String,
    default:"user"
  }
});

const userModel=mongoose.model('User',User)

const userSchema = z.object({
  username: z.string(),
  password: z.string()
});

type User= {
    username: string,
    password: string
}

type jwtUser = {
  username: string,
  role: string
}

export {userModel,User,userSchema,jwtUser}