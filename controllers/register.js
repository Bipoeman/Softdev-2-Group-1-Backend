import conn from "./database/database.js";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
dotenv.config()

const salt = process.env.salt;


export const registerController = (req, res) => {
    const {email,fullname,username,password} = req.body;
    const commandSearch = "select * from user_info where email = ? or username = ?";
    const commandAdd = "insert into user_info(email,fullname,username, password) VALUES (?,?,?,?)";
    conn.query(commandSearch,[email,username],async (err, result) => {
        if (err) throw err;
        else if (result.length !== 0) {
            res.status(400).send({
                error: true, message: "this email has been registered"
            });
        } else {
            const hashedPassword = await bcrypt.hash(password,10 )
            conn.query(commandAdd, [email,fullname, username, hashedPassword],(err,result)=>{
                if (err) throw err;
                else {
                    res.status(201).send({
                        message: "create new user complete",
                        response: result
                    })
                }
            })
        }
    })
}

