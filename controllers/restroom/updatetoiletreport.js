import supabase from "../database/database.js";

export const updatetoiletreport = async (req, res) => {
    const {reportID, status} = req.body;
    console.log(reportID, status, textaccept(status));
    const {data, error} = await supabase.from("toilet_report" ).update({status:textaccept(status)}).eq("id",reportID);
    if (error) {res.status(500).send(error)}
    else {
        res.send(data);
    }
};


const textaccept = (accept) => {
    if (accept) {
        return "accepted"
    } else {
        return "rejected"
    }
}