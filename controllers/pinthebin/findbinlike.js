import supabase from "../database/database.js";

export const findbinlike = async (req, res) => {
    const {findtext} = req.query;
    const {data,error} = await supabase.from("bin_info")
    .select("*")
    .or(`location.ilike.${findtext},description.ilike.${findtext}`);
    if(error) {res.status(500).send(error)}
    else if (data.length === 0) res.send("No bin found");
    else{
        res.send(data);
    }
};