import {decodeToken} from "../token/token.js";
import supabase from "../database/database.js";
import bcrypt from "bcryptjs";

export const changepassword = async (req,res)=>{
    const id = decodeToken(req.headers.authorization).userId;
    const {newpassword} = req.body;
    const hashedPassword = bcrypt.hashSync(newpassword, 10);
    const {data,err} = await supabase.schema("public").from("user_info").update({password: hashedPassword}).eq("id",id);
    if (err) throw err;
    else{
        res.send(data)
    }
}