import express from "express";
import multer from "multer";
import supabase from "../controllers/database/database.js";
import { blogger, commentpost, savepost,addpost,addtitlepicture } from "../controllers/dekhor/adddek.js";
import { countlike, detailpost, posttocategory, showcomment, showsave,posttoprofile ,searchblog ,searchblogger} from "../controllers/dekhor/getdek.js";
import { unlike,deletepost } from "../controllers/dekhor/deldek.js";
import {getrandompost} from "../controllers/dekhor/getrandompost.js";

const uploadtitlepicture = multer();

const router = express.Router();

router.post("/createpost",addpost); // test success

// รูปภาพของ post
router.post("/upload",uploadtitlepicture.single("file"),addtitlepicture); // test พร้อม createpost ??

router.delete("/deletepost",deletepost); // test success

router.post("/savepost",savepost); // test success

router.get("/countlike",countlike); // test success

router.delete("/unlike",unlike); // test success

router.post("/commentpost",commentpost); // test success

router.get("/showcomment",showcomment); // test success

router.get("/randompost",getrandompost)

router.get("/showsave",showsave); // test success // connect

router.get("/posttoprofile",posttoprofile); //test success // connect ?? image asset or network , like number

router.get("/posttocategory",posttocategory); // test success

router.get("/detailpost",detailpost); //test success

// router.get("/nameprofile", async (req, res) => {
//     const {id} = req.query;
//     const { data, error } = await supabase.from("Create_Post").select('id,user:profiles!Create_Post_id_fkey(username)').eq("id",id);
//     if (error){
//         console.log(data)
//         res.status(400).json(error);
//     }
//     else{
//         res.status(200).json(data);
//     }
// })

router.get("/idtopic", async (req, res) => {
    const {id} = req.query;
    const { data, error } = await supabase.from("profiles").select('avatar_url').eq("id",id);
    if (error){
        console.log(data)
        res.status(400).json(error);
    }
    else{
        res.status(200).json(data);
    }
})

router.post("/blogger", blogger);

router.get("/searchblog",searchblog); // test success // connect

router.get("/searchblogger",searchblogger); // connect


export default router;