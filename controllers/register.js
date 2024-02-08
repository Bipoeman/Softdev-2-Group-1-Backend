import supabase from "./database/database.js";
import bcrypt from "bcryptjs";

export const registerController = async (req, res) => {
    const {email, fullname, username, password} = req.body;

    const {data, err} = await supabase.from("user_info").select("*").or(`email.eq.${email},username.eq.${username}`);
    if (err) throw err;
    else {
        if(data.length === 0){
            const hashedPassword = bcrypt.hashSync(password, 10);
            const {data, error} = await supabase
                .from('user_info')
                .insert([
                    { email, fullname, username, password:hashedPassword }
                ]);
            if (error) throw error;
            else {
                res.send("it worked");
            }
        }
        else{
            res.status(400).json({error: true, message: "user already exists"});
        }
    }
}

