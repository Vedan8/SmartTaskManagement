import { Router } from "express";
import type { Request, Response } from "express";
import { authenticate,isAdmin } from "../middleware/userMiddleware";
import { validateTask,validateOwner } from "../middleware/taskMiddleware";
import { analyzeTaskController, createTaskController,deleteTaskController,getTaskByIdController,getTaskController, updateTaskController, getAllTaskController } from "../controllers/taskController";

const taskRoute = Router();


/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Create a task
 *     tags: [Tasks]
 *     security:
 *       - tokenAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title,description,status,priority,date]
 *             properties:
 *                title: { type: string, example: Task name }
 *                description: { type: string, example: Task description }
 *                status: { type: string, example: todo | in-progress | done }
 *                priority: { type: string, example: low | medium | high }
 *                date: { type: date, example: 2026-04-14 }
 *     responses:
 *       200:
 *         description: Task Created
 */
taskRoute.post("/tasks",authenticate,validateTask,async (req:Request,res:Response)=>{
    try {
        await createTaskController(req.body,(req as any).user)
        res.send("Task Created")
    } catch (err:any) {
        res.send(err.message)
    }
})


/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Get tasks of logged-in user
 *     tags: [Tasks]
 *     security:
 *       - tokenAuth: []
 *     responses:
 *       200:
 *         description: List of tasks
 */
taskRoute.get("/tasks",authenticate,async (req:Request,res:Response)=>{
    try {
        const task = await getTaskController((req as any).user)
        res.send(task)
    } catch (err:any) {
        res.send(err.message)
    }
})


/**
 * @swagger
 * /alltask:
 *   get:
 *     summary: Get all tasks (Admin only)
 *     tags: [Tasks]
 *     security:
 *       - tokenAuth: []
 *     responses:
 *       200:
 *         description: List of all tasks
 */
taskRoute.get("/alltask",authenticate,isAdmin,async (req:Request,res:Response)=>{
    try {
        const task = await getAllTaskController()
        res.send(task)
    } catch (err:any) {
        res.send(err.message)
    }
})


/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     summary: Get task by ID
 *     tags: [Tasks]
 *     security:
 *       - tokenAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Task details
 */
taskRoute.get("/tasks/:id",authenticate,async (req:Request,res:Response)=>{
    try {
        const id=req.params.id
        const task = await getTaskByIdController(id)
        res.send(task)
    } catch (err:any) {
        res.send(err.message)
    }
})



/**
 * @swagger
 * /tasks/{id}:
 *   patch:
 *     summary: Update task
 *     tags: [Tasks]
 *     security:
 *       - tokenAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title,description,status,priority,date]
 *             properties:
 *                title: { type: string, example: Task name }
 *                description: { type: string, example: Task description }
 *                status: { type: string, example: todo | in-progress | done }
 *                priority: { type: string, example: low | medium | high }
 *                date: { type: date, example: 2026-04-14 }
 *     responses:
 *       200:
 *         description: Task Updated
 */
taskRoute.patch("/tasks/:id",authenticate,validateTask,validateOwner,async (req:Request,res:Response)=>{
    try {
        const id=req.params.id
        await updateTaskController(req.body,id)
        res.send("Task Updated")
    } catch (err:any) {
        res.send(err.message)
    }
})


/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Delete a task
 *     tags: [Tasks]
 *     security:
 *       - tokenAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Task Deleted
 */
taskRoute.delete("/tasks/:id",authenticate,validateOwner,async (req:Request,res:Response)=>{
    try {
        const id=req.params.id
        await deleteTaskController(id)
        res.send("Task Deleted")
    } catch (err:any) {
        res.send(err.message)
    }
})


/**
 * @swagger
 * /analytics/tasks:
 *   get:
 *     summary: Get task analytics
 *     tags: [Analytics]
 *     security:
 *       - tokenAuth: []
 *     responses:
 *       200:
 *         description: Task analytics data
 */
taskRoute.get("/analytics/tasks",authenticate,async (req:Request,res:Response)=>{
    try {
        const task = await analyzeTaskController((req as any).user)
        res.send(task)
    } catch (err:any) {
        res.send(err.message)
    }
})

export {taskRoute}