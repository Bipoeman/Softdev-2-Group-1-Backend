import supabase from "../database/database.js";
import {decodeToken} from "../token/token.js";

export const addbinreport = async (req, res) => {
    const userId = decodeToken(req.headers.authorization).userId;
    const {description, binId,category,header} = req.body;
    const {data, error} = await supabase.from("bin_report")
        .insert([{
            description,
            bin_id:binId,
            category,
            header,
            user_report:userId
        }])
        .select();
    if (error) throw error;
    else{
        res.send(data);
    }
};