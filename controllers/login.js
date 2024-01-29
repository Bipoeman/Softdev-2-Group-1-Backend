import { signToken } from "./token/token.js";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import conn from "./database/database.js";
dotenv.config()

const salt = process.env.salt;


export const loginController = (req, res) => {
    const {email,password} = req.body;
    const command = "select * from user_info where email = ?";
    conn.query(command,[email],async (err, result) => {
        if (err) throw err;
        else if (result.length !== 1) {
            return res.status(404).json({error: true, message: 'Email or password is incorrect'});
        } else {
            const user = result[0]
            const passwordValid = await bcrypt.compare(password,user.password );
            if (!passwordValid) {
                return res.status(401).json({ error: true, message: 'Email or password is incorrect' });
            }
            res.status(200).send(signToken(user.id,user.name))

        }
    })

}
