import supabase from "../database/database.js";

export const addtoilet = async (req, res) => {
    const {name, address, latitude, longitude,type } = req.body;
    const {data, error} = await supabase.from("toliet_info").insert({
        name,
        address,
        latitude,
        longitude,
        type
    }).select();
    if (error) throw error;
    else{
        res.send(data);
    }
};