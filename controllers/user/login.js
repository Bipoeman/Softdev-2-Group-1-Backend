import { signToken } from "../token/token.js";
import bcrypt from "bcryptjs";
import supabase from "../database/database.js";


export const loginController = async (req, res) => {
    const { emailoruser, password } = req.body;
    const { data, error } = await supabase
        .from('user_info')
        .select('*')
        .or(`email.eq.${emailoruser},username.eq.${emailoruser}`);
    if (error) throw error;
    else {
        if (data.length === 0) {
            res.status(400).json({ error: true, message: "user does not exist" });
        }
        else {
            const user = data[0];
            const validPassword = await bcrypt.compare(password, user.password);
            if (validPassword) {
                res.status(200).send(signToken(user.id, user.role));
            }
            else {
                res.status(400).json({ error: true, message: "invalid password" });
            }
        }
    }
}