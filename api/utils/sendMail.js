import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const sendMail = async (options) => {
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        service: process.env.SMTP_SERVICE,
        secure: false, // true for 465, false for other ports like 587
        auth: {
            user: process.env.SMTP_MAIL,
            pass: process.env.SMTP_PASSWORD,
        },
    });

    const mailOptions = {
        from: process.env.SMTP_MAIL,
        to: options.email,
        subject: options.subject,
        html: options.htmlMessage,
        text: options.message, // Fallback to plain text content
    };

    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.log(error);
        throw new Error('Email could not be sent');
    }
}

export default sendMail;
