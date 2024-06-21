import express from "express"
import { logout, updateUser, deleteUser, getUser, followUser, unfollowUser, allUsers } from "../controllers/user.controller.js"
import { isAuthenticated } from "../middleware/auth.js"


const router = express.Router()

router.post("/logout", logout)
router.put("/update-user/:userId", updateUser, isAuthenticated)
router.delete("/delete-user/:userId", deleteUser, isAuthenticated)
router.get("/:userId", getUser)
router.put("/:userId/follow", followUser, isAuthenticated)
router.put("/:userId/unfollow", unfollowUser, isAuthenticated)
router.get("/", allUsers)
export default router
