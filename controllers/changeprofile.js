import {decodeToken} from "./token/token.js";
import supabase from "./database/database.js";

export const changeprofile = async (req, res) => {
    const id = decodeToken(req.headers.authorization).userId;
    const {fullname, phonenum, birthday} = req.body
    const {data, error} = await supabase.schema("public")
        .from("user_info")
        .update({
            fullname,
            phonenum,
            birthday
        }).eq("id", id)
    if (error) throw error
    else{
        res.send("change profile success")
    }
}