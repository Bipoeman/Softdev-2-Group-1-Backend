import supabase from "../database/database.js";

export const getUsernameFromID = async (req, res) => {
    const {id} = req.body;
    const {data, error} = await supabase.from("user_info")
        .select("id, username")
        .eq("id", id);
    if (error) {
        res.status(500).send({msg: "error fetching data"})
    } else {
        if (data.length === 0) {
            res.status(404).send({exist: false})
        } else {
            res.send({exist: true})
        }
    }
}