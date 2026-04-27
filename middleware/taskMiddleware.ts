import mongoose from "mongoose";
import { taskModel, taskSchema } from "../models/taskModel";
import type { Request, Response,NextFunction } from "express"

function validateTask(req:Request, res:Response, next:NextFunction) {
    try {
        req.body = taskSchema.parse(req.body); 
        return next();
    } catch (err) {
        res.status(400).json(err);
        console.log("Validation error")
    }
}

async function validateOwner(req:Request, res:Response, next:NextFunction) {
    try {
        const owner=new mongoose.Types.ObjectId((req as any).user.id)
        const id=req.params.id
        const task = await taskModel.findById(id)
        if(!task){
            throw new Error("Task not found")
        }
        if(task.user.equals(owner)){
            return next();
        }
        throw new Error("Operation not allowed")
    } catch (err:any) {
        res.status(400).json(err.message);
        console.log("Validation error in middleware")
    }
}

export {validateTask,validateOwner}