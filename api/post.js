import { isAuthenticated } from "./middleware/auth.js";
import {
    allPosts,
    getPost,
    updatePost,
    deletePost,
    likePost,
    userPosts,
    savePost,
    anonymizePost,
    uploadPost,
    downloadPost
} from "./controllers/post.controller.js";
import connectDB from "./database/db.js";

export default allowCors(async function handler(req, res) {
    await connectDB(process.env.MONGO_URL); // Connect to the database
    await isAuthenticated(req, res); // Ensure user is authenticated for all requests except allPosts and getPost

    switch (req.method) {
        case "GET":
            if (req.url === "/api/v1/posts/") {
                return allPosts(req, res);
            } else if (req.url.startsWith("/api/v1/posts/all-post/")) {
                const userId = req.url.split("/")[4]; // Extract userId from the URL
                return userPosts(req, res, userId);
            } else if (req.url.startsWith("/api/v1/posts/")) {
                const postId = req.url.split("/")[4]; // Extract postId from the URL
                return getPost(req, res, postId);
            } else if (req.url.startsWith("/api/v1/posts/download-file/")) {
                const postId = req.url.split("/")[4]; // Extract postId from the URL
                return downloadPost(req, res, postId);
            }
            break;
        case "POST":
            if (req.url === "/api/v1/posts/upload") {
                return uploadPost(req, res);
            } 
            break;
        case "PUT":
            const postIdUpdate = req.url.split("/")[4]; // Extract postId for updates
            if (req.url.endsWith("/update")) {
                return updatePost(req, res, postIdUpdate);
            } else if (req.url.endsWith("/like")) {
                return likePost(req, res, postIdUpdate);
            } else if (req.url.endsWith("/save")) {
                return savePost(req, res, postIdUpdate);
            } else if (req.url.endsWith("/anonymize")) {
                return anonymizePost(req, res, postIdUpdate);
            }
            break;
        case "DELETE":
            const postIdDelete = req.url.split("/")[4]; // Extract postId for deletion
            return deletePost(req, res, postIdDelete);
        default:
            res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
);
