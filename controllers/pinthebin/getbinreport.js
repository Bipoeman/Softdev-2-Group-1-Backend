import supabase from "../database/database.js";


export const getbinreport = async (req, res) => {
    const {data, error} = await supabase.from("bin_report").select("*");
    if (error) throw error;
    else {
        res.send(data);
    }
};