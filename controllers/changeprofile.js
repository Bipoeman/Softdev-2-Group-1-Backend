import {decodeToken} from "./token/token.js";
import supabase from "./database/database.js";

export const changeprofile = async (req, res) => {
    const id = decodeToken(req.headers.authorization).userId;
    const {fullname, phonenum, birthday,description = null} = req.body
    const {data, error} = await supabase.schema("public")
        .from("user_info")
        .update({
            fullname,
            phonenum,
            birthday,
            description
        }).eq("id", id)
    if (error) {res.status(500).send(error)}
    else{
        res.send("change profile success")
    }
}