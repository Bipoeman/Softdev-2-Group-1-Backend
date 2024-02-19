import supabase from "../database/database.js";

export const getidtopic = async (req, res) => {
    const {id} = req.query;
    const { data, error } = await supabase.from("profiles").select('avatar_url').eq("id",id);
    if (error) {res.status(500).send(error)}
    else{
        res.status(200).json(data);
    }
}