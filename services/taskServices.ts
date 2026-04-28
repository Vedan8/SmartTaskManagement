import { taskModel,Task  } from "../models/taskModel";
import mongoose from "mongoose";

async function createTask(Task:Task,User:any){
    try {
        const task=new taskModel(Task)
        task.user=User.id
        await task.save()
    } catch (error:any) {
        throw new Error(error.message)
    }
}

async function getTask(User:any){
    try {
        const task= await taskModel.find({user:User.id})
        console.log(task)
        return(task)
    } catch (error:any) {
        throw new Error(error.message)
    }
}

async function getAllTask(){
    try {
        const task= await taskModel.find()
        console.log(task)
        return(task)
    } catch (error:any) {
        throw new Error(error.message)
    }
}

async function getTaskById(id:any){
    try {
        const task= await taskModel.findById(id)
        console.log(task)
        return(task)
    } catch (error:any) {
        throw new Error(error.message)
    }
}

async function updateTask(data:Task,id:any){
    try {
        const task = await taskModel.findById(id)
        if(!task){
            throw new Error("Task not found")
        }
        task.title=data.title
        task.description=data.description
        task.status=data.status
        task.priority=data.priority
        console.log(task.user)
        task.user=task.user
        task.save()
    } catch (error:any) {
        throw new Error(error.message)
    }
}

async function deleteTask(id:any){
    try {
        const task= await taskModel.deleteOne({_id:id})
    } catch (error:any) {
        throw new Error(error.message)
    }
}

async function analyzeTask(currentUser: any) {
  const userId = new mongoose.Types.ObjectId(currentUser.id);

  const result = await taskModel.aggregate([
    { $match: { user: userId } },
    {
      $group: {
        _id: null,
        total: { $sum: 1 },
        completed: {
          $sum: { $cond: [{ $eq: ["$status", "done"] }, 1, 0] }
        },
        todo: {
          $sum: { $cond: [{ $eq: ["$status", "todo"] }, 1, 0] }
        },
        inProgress: {
          $sum: { $cond: [{ $eq: ["$status", "in-progress"] }, 1, 0] }
        },
        done: {
          $sum: { $cond: [{ $eq: ["$status", "done"] }, 1, 0] }
        },
        low: {
          $sum: { $cond: [{ $eq: ["$priority", "low"] }, 1, 0] }
        },
        medium: {
          $sum: { $cond: [{ $eq: ["$priority", "medium"] }, 1, 0] }
        },
        high: {
          $sum: { $cond: [{ $eq: ["$priority", "high"] }, 1, 0] }
        }
      }
    },
    {
      $project: {
        _id: 0,
        status: {
          todo: "$todo",
          "in-progress": "$inProgress",
          done: "$done"
        },
        priority: {
          low: "$low",
          medium: "$medium",
          high: "$high"
        },
        productivity: {
          total: "$total",
          completed: "$completed",
          pending: { $subtract: ["$total", "$completed"] },
          completionRate: {
            $cond: [
              { $eq: ["$total", 0] },
              0,
              {
                $multiply: [
                  { $divide: ["$completed", "$total"] },
                  100
                ]
              }
            ]
          }
        }
      }
    }
  ]);

  return result[0] || {
    status: { todo: 0, "in-progress": 0, done: 0 },
    priority: { low: 0, medium: 0, high: 0 },
    productivity: { total: 0, completed: 0, pending: 0, completionRate: 0 }
  };
}

export {createTask,getTask,getTaskById,updateTask,deleteTask,analyzeTask,getAllTask}