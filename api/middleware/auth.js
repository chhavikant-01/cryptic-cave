import jwt from "jsonwebtoken"
import User from "../models/user.model.js";
import dotenv from "dotenv";
dotenv.config();

export const isAuthenticated = async (req, res, next) => {
    const token = req.cookies.token;
    // const {token} = req.cookies;
    if(!token){
        res.status(401).json({message: "Unauthorized! Please login to continue"})
    }
    console.log("Hello from isAuthenticated")
    console.log(process.env.JWT_SECRET_KEY)
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded)

    req.user = await User.findById(decoded.id);
    console.log(req.user)

    next();
}