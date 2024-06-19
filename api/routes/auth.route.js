import express from "express";
import { signup, activation } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/activation/:activation_token", activation);

export default router;
