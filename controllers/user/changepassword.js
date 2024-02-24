import {decodeToken} from "../token/token.js";
import supabase from "../database/database.js";
import bcrypt from "bcryptjs";

export const changepassword = async (req,res)=>{
    const id = decodeToken(req.headers.authorization).userId;
    const {newpassword} = req.body;
    const hashedPassword = bcrypt.hashSync(newpassword, 10);
    const {data,error} = await supabase.from("user_info").update({password: hashedPassword}).eq("id",id);
    if (error) {res.status(500).send(error)}
    else{
        res.send(data)
    }
}