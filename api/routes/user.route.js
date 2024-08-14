import express from "express"
import { logout, 
         updateUser, 
         deleteUser, 
         getUser, 
         followUser, 
         unfollowUser, 
         allUsers,
         userPosts,
         getConnections } 
    from "../controllers/user.controller.js"
import { isAuthenticated } from "../middleware/auth.js"


const router = express.Router()

router.post("/logout", logout)
router.put("/update-user", isAuthenticated, updateUser )
router.delete("/delete-user", isAuthenticated, deleteUser )
router.get("/:userId", getUser)
router.get("/:userId/connections",isAuthenticated, getConnections)
router.put("/:userId/follow", isAuthenticated, followUser )
router.put("/:userId/unfollow", isAuthenticated, unfollowUser)
router.get("/:userId/posts", userPosts)
router.get("/", allUsers)
export default router
