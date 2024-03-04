import {decodeToken} from "../token/token.js";
import supabase from "../database/database.js";


export const changeprofile = async (req, res) => {
    const id = decodeToken(req.headers.authorization).userId;
    const {email, fullname, phonenum, birthday, description} = req.body
    const {data, error} = await supabase.from("user_info")
        .update({
            email, fullname, phonenum, birthday, description
        })
        .eq("id", id)
    if (error) {
        res.status(500).send(error)
    } else {
        res.send("change successfully ")
    }
}