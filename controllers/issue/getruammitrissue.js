import supabase from "../database/database.js";

export const getruammitrissue = async (req, res) => {
    const {data, error} = await supabase.from("user_issue")
        .select("*")
        .eq("type", "ruammitr")
        .eq("status", "null");
    if (error) {
        res.status(500).send(error)
    } else {
        res.send(data)
    }
};