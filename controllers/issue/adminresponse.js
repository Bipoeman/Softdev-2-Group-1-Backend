import {decodeToken} from "../token/token.js";
import supabase from "../database/database.js";

export const adminresponse = async (req, res) => {
    const userId = decodeToken(req.headers.authorization).userId;
    const {accept, issue_id} = req.body;
    const {data, error} = await supabase.from("user_issue")
        .update({status: textaccept(accept)})
        .eq("id", issue_id)
        .select("*");
    if (error) {
        res.status(500).send(error)
    } else {
        console.log("update data successfully");
        res.send(data)
    }
}


const textaccept = (accept) => {
    if (accept) {
        return "accepted"
    } else {
        return "rejected"
    }
}