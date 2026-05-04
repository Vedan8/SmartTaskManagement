import mongoose from "mongoose";
import { taskModel, taskSchema,UpdateTaskSchema } from "../models/taskModel";
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

function validateUpdatedTask(req:Request, res:Response, next:NextFunction) {
    try {
        req.body = UpdateTaskSchema.parse(req.body); 
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
            res.status(404)
            throw new Error("Task not found")
        }
        if(task.user.equals(owner) || (req as any).user.role === "admin"){
            return next();
        }
        res.status(403)
        throw new Error("Operation not allowed")
    } catch (err:any) {
        res.status(res.statusCode === 200 ? 500 : res.statusCode).json(err.message);
        console.log("Validation error in middleware")
    }
}

export {validateTask,validateOwner,validateUpdatedTask}