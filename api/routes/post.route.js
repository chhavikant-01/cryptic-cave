import express from "express"
import { isAuthenticated } from "../middleware/auth.js";
import { createPost, 
    updatePost, 
    deletePost,
    allPosts,
    getPost,
    likePost,
    userPosts,
    savePost,
    anonymizePost,
    downloadFile
 } from "../controllers/post.controller.js"
 import multer from "multer";
 import path from "path";
 import { fileURLToPath } from 'url';
 import fs from "fs";

 const __filename = fileURLToPath(import.meta.url);
 const __dirname = path.dirname(__filename);


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const folderId = req.user.id;
        const folderPath = path.join(__dirname, `../uploads/${folderId}/`);

        if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
        }

        cb(null, folderPath);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
  });
  
  const upload = multer({ storage: storage });
  

const router = express.Router();

router.get("/", allPosts)
router.get("/all-post/:userId", userPosts)
router.post("/create-post", isAuthenticated, upload.single('file'), createPost)
router.get("/download/:fileName", downloadFile)
router.get("/:postId", getPost)
router.put("/:postId/update",isAuthenticated, updatePost )
router.delete("/:postId/delete", isAuthenticated, deletePost)
router.put("/:postId/anonymize", isAuthenticated, anonymizePost)
router.put("/:postId/like", isAuthenticated, likePost)
router.put("/:postId/save", isAuthenticated, savePost)



export default router