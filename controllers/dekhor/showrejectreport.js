import supabase from "../database/database.js";

export const showrejectreport = async (req, res) => {
    const { data, error } = await supabase
        .from("dekhor_report")
        .select('id_report,title, reason,id_post').eq("status", "rejected")
    if (error) {
        console.log(error);
        res.status(500).json(error);
    }
    else if (data.length === 0){res.status(404).json({message: "No report found"})}
    else {
        res.status(200).json(data);
    }
};