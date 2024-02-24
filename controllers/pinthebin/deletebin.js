import supabase from "../database/database.js";

export const deletebin = async (req, res) => {
    const binId = req.params.id;
    const {data, error} = await supabase.from("bin_info").delete().eq("id", binId);
    if (error) {res.status(500).send(error)}
    else {
        res.send(data);
    }
};