import supabase from "../database/database.js";

export const getacceptreport = async (req, res) => {
    const {data, error} = await supabase.from("bin_report").select("*").eq("status","accepted");
    if (error) {res.status(500).send(error)}
    else {
        res.send(data);
    }
};