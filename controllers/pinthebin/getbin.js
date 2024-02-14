import supabase from "../database/database.js";

export const getbin = async (req, res) => {
    const {data, error} = await supabase.schema("pinthebin").from("bin_info").select("*");
    if (error) throw error;
    else {
        res.send(data)
    }
}

export const getbinbyid = async (req,res)=>{
    const bin_id = req.params.id;
    const {data,error} = await supabase.schema("pinthebin").from("bin_info").select("*").eq("id",bin_id);
    if (error) throw error;
    else{res.send(data)}
}

export const searchbin = async (req,res)=>{
    const {locations,description} = req.body;
    const {data,error} = await supabase.schema("pinthebin").from("bin_info").select("*").like("location",locations).like("description",description);
    if (error) throw error;
    else{res.send(data)}
};