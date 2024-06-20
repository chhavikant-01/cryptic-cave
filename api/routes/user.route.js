import express from "express"
import { logout, updateUser } from "../controllers/user.controller.js"
import { isAuthenticated } from "../middleware/auth.js"

const router = express.Router()

router.post("/logout", logout)
router.put("/update-user/:userId", updateUser, isAuthenticated)

export default router
