import mongoose from "mongoose";
import getPosts from "../utils/getPosts.js";

const connectDB = async (URL) =>{
    try{
        await mongoose.connect(URL)
        console.log("Database connected");
    } catch(error){
        console.log("Error: ", error.message)
    }
}

export default connectDB;