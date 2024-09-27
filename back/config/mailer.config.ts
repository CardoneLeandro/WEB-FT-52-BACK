import * as nodemailer from "nodemailer";
import { config as dotenvConfig } from "dotenv";

dotenvConfig({path: './.env'});

export const transporter = nodemailer.createTransport({
    host: process.env.GMAIL_HOST,
    port: Number(process.env.GMAIL_PORT),
    secure: true,
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASSWORD
    },
});

transporter.verify().then(() => {
    console.log("Server is ready for sending email messages");
})