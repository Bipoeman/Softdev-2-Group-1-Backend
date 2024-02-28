import {accesssigntoken, refeshsigntoken} from "../token/token.js";
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
                const accesssjwt = accesssigntoken(user.id,user.role);
                const refreshjwt = refeshsigntoken(user.id,user.role);
                res.json(accesssjwt,refreshjwt)
            }
            else {
                res.status(400).json({ error: true, message: "invalid password" });
            }
        }
    }
}