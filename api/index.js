import express from "express";
import connectDB from "./database/db.js";
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import postRoutes from "./routes/post.route.js"
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
dotenv.config();

const PORT = process.env.PORT || 4000;

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});

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
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/posts", postRoutes);

app.get("/", (req, res)=>{
    res.send("Hello World");
})