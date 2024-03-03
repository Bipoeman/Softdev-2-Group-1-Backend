import supabase from "../database/database.js";

export const getreport = async (req, res) => {
    const {data,error} =await supabase.from("toilet_report").select("*")
        .eq("status", "null");
    if(error){
        res.status(500).json({error:error.message})
    }
    else if (data.length ===0) {
        res.status(404).json({message:"No report found"})
    }
    else{
        res.status(200).json(data)
    }
};