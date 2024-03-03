import supabase from "../database/database.js";

export const updatetoiletreport = async (req, res) => {
    res.send("updatetoiletreport");
};


const textaccept = (accept) => {
    if (accept) {
        return "accepted"
    } else {
        return "rejected"
    }
}