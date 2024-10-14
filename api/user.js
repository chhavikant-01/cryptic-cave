import { 
    logout, 
    updateUser, 
    deleteUser, 
    getUser, 
    followUser, 
    unfollowUser, 
    allUsers, 
    userPosts, 
    getConnections 
} from "./controllers/user.controller.js";
import { isAuthenticated } from "./middleware/auth.js";
import connectDB from "./database/db.js";

export default allowCors(async function handler(req, res) {
    await connectDB(process.env.MONGO_URL); // Connect to the database
    await isAuthenticated(req, res); // Ensure user is authenticated for all requests except allUsers and getUser

    const { method, url } = req;

    switch (method) {
        case "POST":
            if (url === "/api/v1/user/logout") {
                return logout(req, res);
            }
            break;

        case "PUT":
            if (url === "/api/v1/user/update-user") {
                return updateUser(req, res);
            } else if (url.startsWith("/api/v1/user/")) {
                const userId = url.split("/")[4]; // Extract userId from the URL
                if (url.endsWith("/follow")) {
                    return followUser(req, res, userId);
                } else if (url.endsWith("/unfollow")) {
                    return unfollowUser(req, res, userId);
                }
            }
            break;

        case "DELETE":
            if (url === "/api/v1/user/delete-user") {
                return deleteUser(req, res);
            }
            break;

        case "GET":
            if (url.startsWith("/api/v1/user/")) {
                const userId = url.split("/")[4]; // Extract userId from the URL
                if (url === "/api/v1/user/all") {
                    return allUsers(req, res);
                } else if (url === "/api/v1/user/" + userId) {
                    return getUser(req, res, userId);
                } else if (url.endsWith("/connections")) {
                    return getConnections(req, res);
                } else if (url.endsWith("/posts")) {
                    return userPosts(req, res, userId);
                }
            } else if (url === "/api/v1/user/") {
                return allUsers(req, res);
            }
            break;

        default:
            res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
);
