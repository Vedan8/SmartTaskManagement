import { Task } from "../models/taskModel";
import { analyzeTask, createTask,deleteTask,getTask, getTaskById, updateTask, getAllTask } from "../services/taskServices";
import { generateSummary, suggestPriority } from "../utils/aifeatures";

async function createTaskController(Task:Task,User:any) {
    await createTask(Task,User)
}

async function getTaskController(User:any) {
    return await getTask(User)
}

async function updateTaskController(data:Task,id:any) {
    await updateTask(data,id)
}

async function getTaskByIdController(id:any) {
    return await getTaskById(id)
}

async function deleteTaskController(id:any) {
    return await deleteTask(id)
}

async function analyzeTaskController(User:any) {
    return await analyzeTask(User)
}

async function getAllTaskController() {
    return await getAllTask()
}

async function getPriority(description: string) {
    return await suggestPriority(description)
}

async function getSummary(description: string) {
    return await generateSummary(description)
}

export {createTaskController,getTaskController,getTaskByIdController,updateTaskController,deleteTaskController,analyzeTaskController,getAllTaskController,getPriority,getSummary}