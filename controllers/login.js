import {signToken} from "./token/token.js";
import bcrypt from "bcryptjs";

import conn from "./database/database.js";


export const loginController = (req, res) => {
    const {emailoruser, password} = req.body;
    const command = "select * from user_info where email = ? or username = ?;";
    conn.query(command, [emailoruser, emailoruser], async (err, result) => {
        if (err) throw err;
        else if (result.length !== 1) {
            return res.status(404).json({error: true, message: 'Email or password is incorrect'});
        } else {
            const user = result[0]
            const passwordValid = await bcrypt.compare(password, user.password);
            if (!passwordValid) {
                return res.status(401).json({error: true, message: 'Email or password is incorrect'});
            }
            res.status(200).send(signToken(user.id, user.email))

        }
    })

}
