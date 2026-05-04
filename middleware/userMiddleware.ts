import { userSchema,UpdateUserSchema } from "../models/userModel";
import type { Request, Response,NextFunction } from "express"
import * as jwt from "jsonwebtoken"
import { jwtUser } from "../models/userModel";

function validateUser(req:Request, res:Response, next:NextFunction) {
    try {
        req.body = userSchema.parse(req.body); 
        return next();
    } catch (err) {
        res.status(400).json(err);
        console.log("Validation error on middleware page")
    }
}

function validateUpdatedUser(req:Request, res:Response, next:NextFunction) {
    try {
        req.body = UpdateUserSchema.parse(req.body); 
        return next();
    } catch (err) {
        res.status(400).json(err);
        console.log("Validation error on middleware page")
    }
}

async function isAdmin(req:Request, res:Response, next:NextFunction) {
    try {
        let headerKey = process.env.TOKEN!
        const token = req.header(headerKey)
        let jwtSecretKey = process.env.JWT_SECRET_KEY! 
        const user = jwt.verify(token!, jwtSecretKey) as jwtUser
        if(user.role==="admin"){
            return next()
        } else{
            res.status(403).send("Authrization failed")
        }
    } catch (err) {
        res.status(403).json(err);
        console.log("Authrization failed")
    }
}

function authenticate(req:Request, res:Response, next:NextFunction) {
    try {
        let headerKey = process.env.TOKEN!
        let jwtSecretKey = process.env.JWT_SECRET_KEY! 
        const token = req.header(headerKey)
        const verified = jwt.verify(token!, jwtSecretKey)
        if(verified){
            (req as any).user = verified
            return next()
        } else{
            res.status(401).send("Authentication failed")
        }
    } catch (err) {
        res.status(401).json(err);
        console.log("Authentication failed")
    }
}

export {validateUser,authenticate,isAdmin,validateUpdatedUser}