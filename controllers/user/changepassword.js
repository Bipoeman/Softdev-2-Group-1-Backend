import {decodeToken} from "../token/token.js";
import supabase from "../database/database.js";

export const changepassword = async (req,res)=>{
    const id = decodeToken(req.headers.authorization).userId;
    const {newpassword} = req.body;
    const {data,err} = await supabase.schema("public").from("user_info").update({password: newpassword}).eq("id",id);
    if (err) throw err;
    else{
        res.send(data)
    }
}