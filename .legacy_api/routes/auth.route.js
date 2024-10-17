import express from "express";
import { signup, activation, login } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signup);
router.get("/activation/:activation_token", activation);
router.post("/login", login)

export default router;
