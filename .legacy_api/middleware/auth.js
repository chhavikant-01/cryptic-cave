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
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);

    next();
}