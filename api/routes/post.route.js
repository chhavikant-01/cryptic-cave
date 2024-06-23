import express from "express"
import { isAuthenticated } from "../middleware/auth.js";
import { createPost, updatePost } from "../controllers/post.controller.js"

const router = express.Router();

router.post("/create-post", isAuthenticated, createPost)
router.put("/:postId/update",isAuthenticated, updatePost )

export default router