import express from "express";
import multer from "multer";
import supabase from "../controllers/database/database.js";
import { blogger, commentpost, likepost, searchblog,addpost,addtitlepicture } from "../controllers/dekhor/adddek.js";
import { countlike, detailpost, posttocategory, showcomment, showlike,posttoprofile } from "../controllers/dekhor/getdek.js";
import { unlike,deletepost } from "../controllers/dekhor/deldek.js";

const uploadtitlepicture = multer();

const router = express.Router();

router.post("/createpost",addpost); // test success

router.post("/upload",uploadtitlepicture.single("file"),addtitlepicture); // test พร้อม createpost ??

router.delete("/deletepost",deletepost); // test success

router.post("/likepost",likepost); // test success

router.get("/countlike",countlike); // test success

router.delete("/unlike",unlike); // test success

router.post("/commentpost",commentpost); // test success

router.get("/showcomment",showcomment); // test success

router.post("/randompost",async (req,res) => {
    const { data, error } = await supabase
    .from('updaterandom') // Replace with your table name
    .select('id_post,title,category,user:profiles!Create_Post_id_fkey(username),image_link')
    // .order('random()') // This orders the rows randomly
    .limit(6); // Adjust the limit as needed
    if (error) {
        console.error('Error fetching random rows:', error);
    } else {
        res.status(200).json(data);
        // console.log('Random rows:', data);
    // Do something with the random rows
    }
})

router.get("/showlike",showlike); // test success

router.get("/posttoprofile",posttoprofile); //test success

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

router.post("/searchblog",searchblog); // test success


//search user
// router.post("/searcuser",async (req,res)=> {
//     const {data,error} = await supabase.from("user_info").select('title,user:profiles!Create_Post_id_fkey(username),category,id_post,image_link') 
//     if (error){
//         console.log(error)
//         res.status(400).json(error);
//     }
//     else{
//         res.status(200).json(data);
//     }
// })




export default router;