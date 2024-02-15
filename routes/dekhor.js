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

router.post("/likepost",async (req,res) =>{
    const {id_post,id} = req.body;
    const {data,error} = await supabase.from("likes").insert({id_post:id_post,id:id})
    if (error ){
        res.status(500).json(error);
    }
    else{
        console.log(data);
        res.status(200).json(data);
    }
})

router.get("/countlike",async (req,res) =>{
    const {id_post} = req.query;
    const {data,error} = await supabase
    .from("likes")
    .select('*', { count: 'exact' })
    .eq("id_post",id_post)
    if (error ){
        res.status(500).json(error);
    }
    else{
        // console.log(data.length);
        res.status(200).json(data);
    }
})

router.delete("/unlike",async (req,res)=>{
    const {id_post,id} = req.query;
    const {error} = await supabase.from("likes").delete().eq('id',id).eq('id_post',id_post)
    if (error){
        res.status(500).json(error);
    }
    else{
        res.status(200).json({msg:"success"})
    }
})

router.post("/commentpost",async (req,res) =>{
    const {id,id_post,comment} = req.body;
    const {data,error} = await supabase.from("comments").insert({id:id,id_post:id_post,comment:comment})
    if (error ){
        res.status(500).json(error);
    }
    else{
        res.status(200).json(data);
    }
})

router.get("/showcomment",async (req,res) =>{
    const {id_post} = req.query
    const {data,error} = await supabase.from("comments").select('user: profiles(username),comment').eq("id_post",id_post)
    if (error ){
        res.status(500).json(error);
    }
    else{
        res.status(200).json(data);
    }
})

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

router.get("/showlike",async (req,res)=>{
    const {id} = req.query;
    const {data,error} = await supabase
    .from('likes')
    .select('id_post,title:Create_Post(title),user:profiles!likes_id_fkey(username),category:Create_Post(category),image:Create_Post(image_link)').eq("id", id)
    if (error){
        console.log(data)
        res.status(400).json(error);
    }
    else{
        res.status(200).json(data);
    }
})

router.get("/posttoprofile",async (req,res)=> {
    const {id} = req.query;
    const {data,error} = await supabase.from("Create_Post").select('id_post,title,category,user:profiles!Create_Post_id_fkey(username),image_link').eq("id",id)
    if (error){
        console.log(error)
        res.status(400).json(error);
    }
    else{
        res.status(200).json(data);
    }
})

router.get("/posttocategory",async (req,res)=> {
    const {category} = req.query;
    const {data,error} = await supabase.from("Create_Post").select('id_post,title,user:profiles!Create_Post_id_fkey(username),image_link').eq("category",category)
    if (error){
        console.log(error)
        res.status(400).json(error);
    }
    else{
        res.status(200).json(data);
    }
})

router.get("/detailpost",async (req,res)=> {
    const {id_post} = req.query;
    const {data,error} = await supabase.from("Create_Post").select('id,title,name:profiles!Create_Post_id_fkey(username),content,image_link').eq("id_post",id_post)
    if (error){
        console.log(data)
        res.status(400).json(error);
    }
    else{
        res.status(200).json(data);
    }
})

router.get("/nameprofile", async (req, res) => {
    const {id} = req.query;
    const { data, error } = await supabase.from("Create_Post").select('id,user:profiles!Create_Post_id_fkey(username)').eq("id",id);
    if (error){
        console.log(data)
        res.status(400).json(error);
    }
    else{
        res.status(200).json(data);
    }
})

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

router.post("/blogger", async (req, res) => {
    const { data, error } = await supabase.from('distinct_id').select('user:profiles(id, username),image: profiles(avatar_url)');
    if (error) {
        console.error(error);
        res.status(400).json(error);
    } else {
        res.status(200).json(data);
    }
});

router.post("/searchblog",async (req,res)=> {
    const {data,error} = await supabase.from("Create_Post").select('title,user:profiles!Create_Post_id_fkey(username),category,id_post,image_link') 
    if (error){
        console.log(error)
        res.status(400).json(error);
    }
    else{
        res.status(200).json(data);
    }
})


//search user
router.post("/searcuser",async (req,res)=> {
    const {data,error} = await supabase.from("user_info").select('title,user:profiles!Create_Post_id_fkey(username),category,id_post,image_link') 
    if (error){
        console.log(error)
        res.status(400).json(error);
    }
    else{
        res.status(200).json(data);
    }
})




export default router;