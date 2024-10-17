import User from "../models/user.model.js";
import sendToken from "../utils/jwtToken.js";
import jwt from "jsonwebtoken";
import sendMail from "../utils/sendMail.js";
import dotenv from "dotenv";
dotenv.config();

export const signup = async (req, res, next) => {
    try {
        const { firstname, lastname, email, password } = req.body;
        console.log(req.body);
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
            return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "5m" });
        };

        const activationToken = createActivationToken(user);
        const activationUrl = `${process.env.BASE_URL}/api/v1/auth/activation/${activationToken}`;
        const htmlMessage = `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f4f4f4;
                    margin: 0;
                    padding: 0;
                }
                .container {
                    max-width: 600px;
                    margin: 0 auto;
                    background-color: #ffffff;
                    padding: 20px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }
                .header {
                    background-color: #4CAF50;
                    color: white;
                    text-align: center;
                    padding: 10px 0;
                }
                .header h1 {
                    margin: 0;
                    font-size: 24px;
                }
                .content {
                    padding: 20px;
                    text-align: center;
                }
                .content p {
                    font-size: 16px;
                    line-height: 1.5;
                    margin: 20px 0;
                }
                .button {
                    display: inline-block;
                    padding: 10px 20px;
                    font-size: 16px;
                    color: white;
                    background-color: #4CAF50;
                    text-decoration: none;
                    border-radius: 5px;
                }
                .footer {
                    background-color: #f1f1f1;
                    text-align: center;
                    padding: 10px;
                    font-size: 12px;
                    color: #888;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>Email Verification</h1>
                </div>
                <div class="content">
                    <p>Hello, ${user.firstname}</p>
                    <p>Thank you for registering with us. Please click the button below to verify your email address.</p>
                    <a href="${activationUrl}" class="button">Verify Email</a>
                </div>
                <div class="footer">
                    <p>&copy; 2024 Cryptic Cave. All rights reserved.</p>
                </div>
            </div>
        </body>
        </html>
    `;

        try {
            await sendMail({
                email: user.email,
                subject: "Activate Your Account",
                htmlMessage,
                message: `Hello ${user.firstname}, please click on the link to activate your account: ${activationUrl}`,// Fallback plain text message
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

export const login = async (req, res, next) => {
    try{
        const { email, password } = req.body;

        if(!email || !password){
            return res.status(400).json({message: "Please enter all fields!"})
        }

        const user = await User.findOne({email}).select("+password");

        if(!user){
            return res.status(400).json({message: "User doesn't exist!"})
        }

        const isPasswordValid = await user.comparePassword(password);

        if(!isPasswordValid){
            return res.status(400).json({message: "Please provide the correct information"})
        }
        
        sendToken(user,200,res)

    } catch(e){
        res.status(500).json({message: e.message})
    }
}
