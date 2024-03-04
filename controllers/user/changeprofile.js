import {decodeToken} from "../token/token.js";
import supabase from "../database/database.js";


export const changeprofile = async (req, res) => {
    const id = decodeToken(req.headers.authorization).userId;
    const {email,fullname, phonenum, birthday,description} = req.body
    const {data :checkemail, error} = await supabase.from("user_info")
        .select("*").eq("email",email);
    if(error) {res.status(500).send(error)}
    else if (checkemail.length !== 0){
        res.status(400).send("email already exist")
    }
    else{
        const {data,error} = await supabase.from("user_info")
            .update({
                email, fullname, phonenum, birthday, description
            })
            .eq("id",id)
        if(error) {res.status(500).send(error)}
        else{
            res.send("update sucessfully")
        }
    }

}