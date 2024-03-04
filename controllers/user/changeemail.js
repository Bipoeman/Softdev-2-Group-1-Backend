import {decodeToken} from "../token/token.js";
import supabase from "../database/database.js";

export const changeemail = async (req, res) => {
    const id = decodeToken(req.headers.authorization).userId;
    const {email} = req.body
    const {data: checkemail, error} = await supabase.from("user_info")
        .select("email").eq("email", email);
    if(error) {res.status(500).send(error)}
    else if (checkemail.length !== 0 ){
        res.status(400).send({msg:"email already exist"})
    }
    else {
        const {data, error} = await supabase.from("user_info")
            .update({
                email
            })
            .eq("id", id)
        if (error) {
            res.status(500).send(error)
        } else {
            res.send("change successfully ")
        }
    }
}