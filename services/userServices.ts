import {User,userModel} from "../models/userModel"
import { encryptPassword,checkPassword } from "../utils/passwordEncrypt"
import * as jwt from "jsonwebtoken"

async function signUp(User:User){
    try {
        const hashed = await encryptPassword(User.password)
        User.password=hashed
        const user=new userModel(User)
        await user.save()
    } catch (error:any) {
        throw new Error(error.message)
    }
}

async function getUsers() {
    const users=await userModel.find().select("username").select("id")
    return users
}

async function getProfile(User:any) {
    const user=await userModel.findById(User.id).select("-password")
    if (!user) {
        throw new Error("User not found");
    }
    return user
}

async function updateProfile(data:User,User:any) {
    const user=await userModel.findById(User.id)
    if (!user) {
        throw new Error("User not found");
    }
    if (data.username) { user.username=data.username }
    if (data.password) { user.password = await encryptPassword(data.password); }
    await user.save()
}

async function login(User:User) {
    const user= await userModel.findOne({username:User.username})
    if(user===null){
        throw new Error("User not found");
    }
    const password=User.password
    const hashed=user.password
    if(await checkPassword(password, hashed)){
        const token = jwt.sign({id:user._id,username:user.username,role:user.role},process.env.JWT_SECRET_KEY!,{ expiresIn: "1d" })
        return token
    } else{
        throw new Error("Wronge password");
    }
}

export {signUp,getUsers,login,getProfile,updateProfile}