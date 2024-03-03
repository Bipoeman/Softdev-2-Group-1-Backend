import supabase from "../database/database.js";

export const updatereport = async (req, res) => {
    const {reportID, status} = req.body;
    const {data, error} = await supabase.from("bin_report").update({status:textaccept(status)}).eq("id",reportID);
    if (error) {res.status(500).send(error)}
    else {
        res.send("upodate success");
    }
};


const textaccept = (accept) => {
    if (accept) {
        return "accepted"
    } else {
        return "rejected"
    }
}