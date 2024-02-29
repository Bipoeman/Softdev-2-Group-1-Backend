import supabase from "../database/database.js";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import {config} from "dotenv";

config();

export const resetpassword = async (req, res) => {
    const {emailoruser} = req.body;
    const {
        data : datauser,
        error
    } = await supabase.from("user_info").select("*").or(`email.eq.${emailoruser},username.eq.${emailoruser}`);
    if (error) {
        res.status(500).send(error)
    } else if (datauser.length === 0) {
        res.status(400).json({error: true, message: "user does not exist"});
    } else {
        // logic reset password
        const newpass = generateRandomPassword(12);
        const response = await mailsender(datauser[0].email, newpass);
        if (response) {
            const hashedPassword = bcrypt.hashSync(newpass, 10);
            const {data, error} = await supabase
                .from('user_info').update({password: hashedPassword}).eq('id', datauser[0].id);
            if (error) {res.status(500).send(error)}
            else {
                res.send("new password has been sent to your email")
            }

        }
            else {
            res.status(500).send("error in sending email")
        }
    }
};

const mailsender = async (email, newpass) => {
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
        text: `it new password for your account is  ${newpass}  , please change it after login.`
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

function generateRandomPassword(length) {
    // Define allowed characters for the password
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+{}|:<>?-=[];,./";

    let password = '';
    for (let i = 0; i < length; i++) {
        // Generate a random index to select a character from the charset
        const randomIndex = Math.floor(Math.random() * charset.length);
        // Append the randomly selected character to the password
        password += charset[randomIndex];
    }

    return password;
}