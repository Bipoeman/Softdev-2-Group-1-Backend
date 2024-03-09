import {decodeToken} from "../token/token.js";
import supabase from "../database/database.js";

export const getuserdatabyid =async (req, res) => {
    const id = decodeToken(req.headers.authorization).userId;
    const {data, error} = await supabase.from("user_info")
        .select("id,email,fullname,username,phonenum,birthday,profile,role,description,avatar")
        .eq("id", id);

    if (error) {res.status(500).send(error)}
    else{
        if(data.length === 0){
            res.status(404).send("user not found")
        }
        else{
            // delete id,password
            res.send(data[0])
        }
    }
}