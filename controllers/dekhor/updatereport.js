import supabase from "../database/database.js";

export const updatereport = async (req, res) => {
    const { reportID,status } = req.body;
    const { data, error } = await supabase
        .from("dekhor_report")
        .update({ status: textaccept(status) })
        .eq("id_report", reportID);
    if (error) {
        console.log(error);
        res.status(500).json(error);
    } else {
        res.status(200).json("Report updated successfully");
    }
};




const textaccept = (accept) => {
    if (accept) {
        return "accepted"
    } else {
        return "rejected"
    }
}