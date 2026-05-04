import mongoose from "mongoose"
import * as z from "zod"

const Task = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ["todo", "in-progress", "done"],
        default: "todo",
    },
    priority: {
        type: String,
        enum: ["low", "medium", "high"],
    },
    due_date: {
        type: Date,
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    }
});

const taskModel=mongoose.model('Task',Task)

const taskSchema = z.object({
    title: z.string(),
    description: z.string(),
    status: z.enum(["todo", "in-progress", "done"]),
    priority: z.enum(["low", "medium", "high"]),
    due_date:z.coerce.date(),
});

const UpdateTaskSchema = z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    status: z.enum(["todo", "in-progress", "done"]).optional(),
    priority: z.enum(["low", "medium", "high"]).optional(),
    due_date:z.coerce.date().optional(),
});

type Task= {
    title: string,
    description: string,
    status:"todo"|"in-progress"|"done",
    priority:"low"|"medium"|"high",
    due_date:Date,
    user: mongoose.Types.ObjectId
}

export {taskModel,Task,taskSchema,UpdateTaskSchema}