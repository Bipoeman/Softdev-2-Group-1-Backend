import conn from "./database/database.js";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
dotenv.config()

const salt = process.env.salt;


export const registerController = (req, res) => {
    const {email,name,password} = req.body;
    const commandSearch = "select * from user_info where email = ?";
    const commandAdd = "insert into user_info(email, name, password) VALUES (?,?,?)";
    conn.query(commandSearch,[email],async (err, result) => {
        if (err) throw err;
        else if (result.length !== 0) {
            res.status(400).send({
                error: true, message: "this email has been registered"
            });
        } else {
            const hashedPassword = await bcrypt.hash(password,salt )
            conn.query(commandAdd, [email, name, hashedPassword],(err,result)=>{
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

