import supabase from "../database/database.js";
import database from "../database/database.js";

export const getallissue = async (req,res)=>{
    const {data,error} = await supabase.from("user_issue").select("*");
    if(error) {res.status(500).send(error)}
    else{res.send(database)}
}