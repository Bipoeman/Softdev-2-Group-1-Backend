import {decodeToken} from "./token/token.js";
import supabase from "./database/database.js";

export const supportControlloer = async (req, res) => {
    const user_id = decodeToken(req.headers.authorization).userId;
    const {description, contact ,  finished = false} = req.body;
    const { data, error } = await supabase
        .from('comment')
        .insert({
            user_id,
            description,
            contact,
            finished
        });
    if (error) {res.send(error)}
    else{
        res.send(data);
    }
}