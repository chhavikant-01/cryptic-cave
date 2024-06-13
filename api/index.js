import express from "express";
import connectDB from "./database/db";
import dotenv from "dotenv";
import cors from "cors";

const app = express();
dotenv.config();

// Connect to database
const URL = process.env.MONGO_URL;
connectDB(URL);

// Middleware
app.use(express.json());
app.use(cors(
    {
        origin: ["http://localhost:3000"],
        methods: ["GET","POST","DELETE"],
        credentials: true,
        // allowedHeaders:[],
        // exposedHeaders:[],
        // preflightContinue: false,

    }
));