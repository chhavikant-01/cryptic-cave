import mongoose from "mongoose";

const connectDB = async (URL) =>{
    try{
        await mongoose.connect(URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        })
        console.log("Database connected")
    } catch(error){
        console.log("Error: ", error.message)
    }
}

export default connectDB;