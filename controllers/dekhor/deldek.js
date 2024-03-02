import supabase from "../database/database.js";
import {decodeToken} from "../token/token.js";

export const deletepost = async (req,res)=>{
    const {id_post} = req.params;
    const {error} = await supabase.from("dekhor_post").delete().eq('id_post', id_post)
    if (error){
        res.status(500).json(error);
    }
    else{
        res.status(200).json({msg:"success"})
    }
}

export const deletedraft = async (req,res)=>{
    const {id_draft} = req.params;
    const {error} = await supabase.from("dekhor_draft").delete().eq('id_draft', id_draft)
    if (error){
        res.status(500).json(error);
    }
    else{
        res.status(200).json({msg:"success"})
    }
}

export const unsave = async (req,res)=>{
    const id_user = decodeToken(req.headers.authorization).userId;
    const {id_post} = req.params;
    const {error} = await supabase.from("dekhor_savepost").delete().eq('id_user',id_user).eq('id_post',id_post)
    if (error){
        res.status(500).json(error);
    }
    else{
        res.status(200).json({msg:"success"})
    }
}

export const deletereport = async (req,res)=>{
    const {id_report} = req.params;
    const {error} = await supabase.from("dekhor_report").delete().eq('id_report', id_report)
    if (error){
        res.status(500).json(error);
    }
    else{
        res.status(200).json({msg:"success"})
    }
}

