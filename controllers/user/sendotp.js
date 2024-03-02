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
    } = await supabase.from("user_info").select("*").or(`email.eq.${email},username.eq.${email}`);
    if (error) {
        res.status(500).send(error)
    } else if (datauser.length === 0) {
        res.status(400).json({error: true, message: "user does not exist"});
    } else {
        // logic reset password
        const otp = generateRandomOTP(6);
        const response = await mailsender(datauser[0].email, otp);
        if (response) {
            // sanding otp in email
            const hashedotp = bcrypt.hashSync(otp, 8);
            const {data, error} = await supabase.from("user_info").update({otp: hashedotp})
                .eq("id", datauser[0].id).select();
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

const mailsender = async (email, otp) => {
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
    const mailOptions = {
        from: {
            name: "rummitr",
            address: process.env.EMAIL_USER
        },
        to: [email],
        subject: 'Sending Email using Node.js',
        text: `it OTP for your account is  ${otp}  , please change it after login.`
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

function generateRandomOTP(length) {
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