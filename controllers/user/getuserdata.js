import supabase from "../database/database.js";

export const getuserdata = async (req, res) => {
    const {data, error} = await supabase.from("user_info").select("*");
    if (error) {res.status(500).send(error)}
    else{
        res.send(data)
    }
}