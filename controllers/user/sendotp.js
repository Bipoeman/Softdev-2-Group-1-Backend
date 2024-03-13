import supabase from "../database/database.js";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import {config} from "dotenv";

config();

export const sendotp = async (req, res) => {
    const {email} = req.query;
    const {
        data : datauser,
        error
    } = await supabase.from("user_info").select("*").eq("email", email)
    if (error) {
        res.status(500).send(error)
    } else if (datauser.length === 0) {
        res.status(400).json({error: true, message: "user does not exist"});
    } else {
        // logic reset password
        const otpGen = generateRandomOTP(6);
        const timestampz = new Date();
        const response = await mailsender(datauser[0].email, otpGen, timestampz);
        if (response) {
            // sanding otp in email
            const hashedotp = bcrypt.hashSync(otpGen, 8);
            const {data, error} = await supabase
                .from("user_info")
                .update({otp: hashedotp, otp_created_at: timestampz.toISOString()})
                .eq("id", datauser[0].id)
                .select();
            if (error) {
                res.status(500).send(error)}
            else {
                res.status(200).json( {message: "otp sent to email"})
            }
        }
        else {
            res.status(500).send("error in sending email")
        }
    }
};

const mailsender = async (email, otp, timestampz) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.forwardemail.net",
        port: 587,
        secure: false,
        auth: {
            // TODO: replace `user` and `pass` values from <https://forwardemail.net>
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });
    const timePlus10 = new Date(timestampz);
    timePlus10.setMinutes(timePlus10.getMinutes() + 10);
    const mailOptions = {
        from: {
            name: "RuamMitr",
            address: process.env.EMAIL_USER
        },
        to: [email],
        subject: 'OTP Request from RuamMitr',
        text: `The OTP for your account is ${otp}, please change it after login. This OTP will expire at ${timePlus10.toISOString()}`
    };
    console.log("try to send email")
    try {
        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent: " + info.response);
        return true
    } catch (error) {
        console.log(error);
        return false
    }
}

export function generateRandomOTP(length) {
    // Define allowed characters for the password
    const charset = "0123456789";

    let password = '';
    for (let i = 0; i < length; i++) {
        // Generate a random index to select a character from the charset
        const randomIndex = Math.floor(Math.random() * charset.length);
        // Append the randomly selected character to the password
        password += charset[randomIndex];
    }

    return password;
}