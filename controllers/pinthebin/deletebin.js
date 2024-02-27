import supabase from "../database/database.js";

export const deletebin = async (req, res) => {
    const binId = req.params.id;
    const {data, error} = await supabase.from("bin_info").delete().eq("id", binId);
    if (error) throw error;
    else {
        res.send(data);
    }
};