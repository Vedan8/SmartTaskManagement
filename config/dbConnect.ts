import mongoose from "mongoose"

async function dbConnect(URI:string) {
    try {
        await mongoose.connect(URI)
        console.log("db Connected")
    } catch (err) {
        console.log(err)
    }
}

export default dbConnect