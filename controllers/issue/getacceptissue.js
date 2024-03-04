import supabase from "../database/database.js";


export const getacceptissue = async (req,res)=>{
    const {data,error} = await supabase.from("user_issue").select("*").eq("status","accepted");
    if(error) {res.status(500).send(error)}
    else{res.send(data)}
}