import {signUp,getUsers,login, getProfile, updateProfile} from "../services/userServices"
import {User} from "../models/userModel"

async function signUpController(User:User){
    await signUp(User)
}

async function getUserController() {
    return await getUsers()
}

async function getProfileController(User:any) {
    return await getProfile(User)
}

async function updateProfileController(data:User,User:any) {
    await updateProfile(data,User)
}

async function loginController(User:User){
    return await login(User)
}

export {signUpController,getUserController,loginController,getProfileController,updateProfileController}