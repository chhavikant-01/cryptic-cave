import User from "../models/user.model.js";
import sendToken from "../utils/jwtToken.js";
import jwt from "jsonwebtoken";
import sendMail from "../utils/sendMail.js";
import dotenv from "dotenv";
dotenv.config();

export const signup = async (req, res, next) => {
    try {
        const { firstname, lastname, email, password } = req.body;
        const userEmail = await User.findOne({ email });
        const userUsername = email.split("@")[0];

        if (userEmail) {
            return res.status(400).json({ message: "User already exists" });
        }

        const user = {
            firstname,
            lastname,
            email,
            password,
            username: userUsername,
        };

        const createActivationToken = (user) => {
            return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "10m" });
        };

        const activationToken = createActivationToken(user);
        const activationUrl = `${process.env.BASE_URL}/api/auth/activation/${activationToken}`;

        try {
            await sendMail({
                email: user.email,
                subject: "Activate Your Account",
                message: `Hello ${user.firstname}, please click on the link to activate your account: ${activationUrl}`,
            });
            res.status(201).json({
                status: "success",
                message: `Please check your email: ${user.email} to activate your account!`,
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const activation = async (req, res, next) => {
    try {
        const { activation_token } = req.params;

        const newUser = jwt.verify(activation_token, process.env.JWT_SECRET);

        if (!newUser) {
            return res.status(400).json({ message: "Invalid token" });
        }

        const { firstname, lastname, email, password } = newUser;

        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }

        user = await User.create({
            firstname,
            lastname,
            email,
            password,
            username: email.split("@")[0],
        });

        sendToken(user, 201, res);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
