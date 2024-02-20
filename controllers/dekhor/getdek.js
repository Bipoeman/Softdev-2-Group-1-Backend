import supabase from "../database/database.js";
import { decodeToken } from "../token/token.js";


export const countlike = async (req, res) => {
    const { id_post } = req.query;
    const { data, error } = await supabase
        .from("dekhor_savepost")
        .select('*', { count: 'exact' })
        .eq("id_post", id_post)
    if (error) {
        res.status(500).json(error);
    }
    else {
        res.status(200).json(data);
    }
}

export const showcomment = async (req, res) => {
    const { id_post } = req.query
    const { data, error } = await supabase.from("dekhor_comment").select('user: user_info(fullname),comment').eq("id_post", id_post)
    if (error) {
        res.status(500).json(error);
    }
    else {
        res.status(200).json(data);
    }
}

export const showsave = async (req, res) => {
    const id_user = decodeToken(req.headers.authorization).userId;
    const { data, error } = await supabase
        .from('dekhor_savepost')
        .select('post:dekhor_post(id_post,title,category,image_link),user:user_info(fullname)').eq("id_user", id_user)
    if (error) {
        console.log(data)
        res.status(400).json(error);
    }
    else {
        res.status(200).json(data);
    }
}

export const posttoprofile = async (req, res) => {
    const id_user = decodeToken(req.headers.authorization).userId;
    const { data, error } = await supabase
        .from("dekhor_post")
        .select('id_post,title, category, image_link, user:public_dekhor_post_id_user_fkey(fullname)')
        .eq("id_user", id_user);

    if (error) {
        console.log(error);
        res.status(400).json(error);
    } else {
        res.status(200).json(data);
    }
}

export const posttocategory = async (req, res) => {
    const { category } = req.query;
    const { data, error } = await supabase.from("dekhor_post").select('id_post,title, category, image_link, user:public_dekhor_post_id_user_fkey(fullname)').eq("category", category)
    if (error) {
        console.log(error)
        res.status(400).json(error);
    }
    else {
        res.status(200).json(data);
    }
}

export const detailpost = async (req, res) => {
    const { id_post } = req.query;
    const { data, error } = await supabase.from("dekhor_post")
        .select('id_post,title,content, category, image_link, user:public_dekhor_post_id_user_fkey(fullname)')
        .eq("id_post", id_post)
    if (error) {
        console.log(data)
        res.status(400).json(error);
    }
    else {
        res.status(200).json(data);
    }
}

// export const nameprofile = async (req, res) => {
//     const {id} = req.query;
//     const { data, error } = await supabase.from("Create_Post").select('id,user:profiles!Create_Post_id_fkey(username)').eq("id",id);
//     if (error){
//         console.log(data)
//         res.status(400).json(error);
//     }
//     else{
//         res.status(200).json(data);
//     }
// }
export const searchblog = async (req,res)=> {
    const {data,error} = await supabase.from("dekhor_post").select('id_post,title, category, image_link, user:public_dekhor_post_id_user_fkey(fullname)') 
    if (error){
        console.log(error)
        res.status(400).json(error);
    }
    else{
        res.status(200).json(data);
    }
}

export const searchblogger = async (req,res)=> {
    const {data,error} = await supabase.from("blogger").select('user:public_dekhor_post_id_user_fkey(fullname)') 
    if (error){
        console.log(error)
        res.status(400).json(error);
    }
    else{
        res.status(200).json(data);
    }
}