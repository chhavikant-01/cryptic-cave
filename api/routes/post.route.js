import express from "express"
import { isAuthenticated } from "../middleware/auth.js";
import { createPost, updatePost, deletePost, allPosts, getPost, likePost } from "../controllers/post.controller.js"

const router = express.Router();

router.get("/", allPosts)
router.post("/create-post", isAuthenticated, createPost)
router.get("/:postId", getPost)
router.put("/:postId/update",isAuthenticated, updatePost )
router.delete("/:postId/delete", isAuthenticated, deletePost)
router.put("/:postId/like", isAuthenticated, likePost)



export default router