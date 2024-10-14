import { signup, activation, login } from "./controllers/auth.controller.js";
import connectDB from "./database/db.js";
export default allowCors(async function handler(req, res) {
    await connectDB(process.env.MONGO_URL); // Connect to the database
    switch (req.method) {
        case "POST":
            if (req.url === "/api/v1/auth/signup") {
                return signup(req, res);
            } else if (req.url === "/api/v1/auth/login") {
                return login(req, res);
            }
            break;
        case "GET":
            if (req.url.startsWith("/activation")) {
                const activation_token = req.url.split("/")[3]; // Extract token from URL
                return activation(req, res, activation_token);
            }
            break;
        default:
            res.setHeader("Allow", ["GET", "POST"]);
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
);
