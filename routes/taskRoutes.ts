import { Router } from "express";
import type { Request, Response } from "express";
import { authenticate,isAdmin } from "../middleware/userMiddleware";
import { validateTask,validateOwner } from "../middleware/taskMiddleware";
import { analyzeTaskController, createTaskController,deleteTaskController,getTaskByIdController,getTaskController, updateTaskController, getAllTaskController } from "../controllers/taskController";

const taskRoute = Router();

taskRoute.post("/tasks",authenticate,validateTask,async (req:Request,res:Response)=>{
    try {
        await createTaskController(req.body,(req as any).user)
        res.send("Task Created")
    } catch (err:any) {
        res.send(err.message)
    }
})

taskRoute.get("/tasks",authenticate,async (req:Request,res:Response)=>{
    try {
        const task = await getTaskController((req as any).user)
        res.send(task)
    } catch (err:any) {
        res.send(err.message)
    }
})

taskRoute.get("/alltask",authenticate,isAdmin,async (req:Request,res:Response)=>{
    try {
        const task = await getAllTaskController()
        res.send(task)
    } catch (err:any) {
        res.send(err.message)
    }
})

taskRoute.get("/tasks/:id",authenticate,async (req:Request,res:Response)=>{
    try {
        const id=req.params.id
        const task = await getTaskByIdController(id)
        res.send(task)
    } catch (err:any) {
        res.send(err.message)
    }
})

taskRoute.patch("/tasks/:id",authenticate,validateTask,validateOwner,async (req:Request,res:Response)=>{
    try {
        const id=req.params.id
        await updateTaskController(req.body,id)
        res.send("Task Updated")
    } catch (err:any) {
        res.send(err.message)
    }
})

taskRoute.delete("/tasks/:id",authenticate,validateOwner,async (req:Request,res:Response)=>{
    try {
        const id=req.params.id
        await deleteTaskController(id)
        res.send("Task Deleted")
    } catch (err:any) {
        res.send(err.message)
    }
})

taskRoute.get("/analytics/tasks",authenticate,async (req:Request,res:Response)=>{
    try {
        const task = await analyzeTaskController((req as any).user)
        res.send(task)
    } catch (err:any) {
        res.send(err.message)
    }
})

export {taskRoute}