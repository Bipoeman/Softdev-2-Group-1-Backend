import { decodeToken } from "../token/token.js";
import supabase from "../database/database.js";

export const gettoiletbyid = async (req, res) => {
    const userId = decodeToken(req.headers.authorization).userId;
    const { data, error } = await supabase.from("toilet_info").select("*").eq("user_id", userId);
    if (error) {
        res.status(500).send(error);
    } else {
        res.send(data);
    }
};
