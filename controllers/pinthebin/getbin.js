import supabase from "../database/database.js";
import {decodeToken} from "../token/token.js";

export const getbin = async (req, res) => {
    const {data, error} = await supabase.from("bin_info").select("*");
    if (error) throw error;
    else {
        res.send(data)
    }
}

export const getbinbyid = async (req,res)=>{
    const bin_id = req.params.id;
    const {data,error} = await supabase.from("bin_info").select("*").eq("id",bin_id);
    if (error) throw error;
    else{
        if (data.length === 0){res.status(404).send("bin not found")}
        else{res.send(data)}
    }
}


export const getbinbyuserid = async (req,res)=>{
    const userId = decodeToken(req.headers.authorization).userId;
    const {data,error} = await supabase.from("bin_info").select("*").eq("user_update",userId);
    if (error) throw error;
    else{
        if (data.length === 0){res.status(404).send("bin not found")}
        else{
            res.send(data)
        }
    }
};

export const searchbin = async (req,res)=>{
    const {locationsordescription} = req.body;
    const {data,error} = await supabase.schema("pinthebin")
        .from("bin_info")
        .select("*")
        .or(`location.like.${locationsordescription}`,`description.like.${locationsordescription}`);
    if (error) throw error;
    else{res.send(data)}
};