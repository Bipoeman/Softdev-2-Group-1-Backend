import express from "express";
import multer from "multer";
import supabase from "../controllers/database/database.js";

const upload = multer();

const router = express.Router();

router.post("/creatpost", async (req,res)=>{
    const {title,content,category,email,id,image_link} = req.body;
    const {data ,error} = await supabase.from("Create_Post").insert({
        title,
        content,
        category,
        email,
        id,
        image_link
    })
    if (error){
        res.status(500).json(error);
    }
    else{
        res.status(200).json(data);
    }
})

router.delete("/deletepost",async (req,res)=>{
    const {id_post} = req.query;
    const {error} = await supabase.from("Create_Post").delete().eq('id_post', id_post)
    if (error){
        res.status(500).json(error);
    }
    else{
        res.status(200).json({msg:"success"})
    }
})











export default router;