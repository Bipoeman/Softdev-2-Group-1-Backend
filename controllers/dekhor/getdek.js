import supabase from "../database/database.js";
import { decodeToken } from "../token/token.js";


export const countsave= async (req, res) => {
    const { id_post } = req.params;
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
    const { id_post } = req.params;
    const { data, error } = await supabase.from("dekhor_comment").select('user: user_info(fullname,profile),comment').eq("id_post", id_post)
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
        .select('post:dekhor_post(id_post,title,category,image_link,save),fullname_blogger').eq("id_user", id_user)
    if (error) {
        console.log(data)
        res.status(400).json(error);
    }
    else {
        res.status(200).json(data);
    }
}

export const showsaveblogger = async (req, res) => {
    const fullname = req.params.fullname;
    const { data, error } = await supabase
        .from('dekhor_savepost')
        .select('post:dekhor_post(id_post,title,category,image_link),fullname_blogger').eq("fullname", fullname)
    if (error) {
        console.log(data)
        res.status(400).json(error);
    }
    else {
        res.status(200).json(data);
    }
}

export const showreport = async (req, res) => {
    const { data, error } = await supabase
        .from("dekhor_report")
        .select('id_report,title, reason, id_user')
    if (error) {
        console.log(error);
        res.status(400).json(error);
    } else {
        res.status(200).json(data);
    }
}

export const posttoprofile = async (req, res) => {
    const id_user = decodeToken(req.headers.authorization).userId;
    const { data, error } = await supabase
        .from("dekhor_post")
        .select('id_post,title, category, image_link,save, user:public_dekhor_post_id_user_fkey(fullname)')
        .eq("id_user", id_user);

    if (error) {
        console.log(error);
        res.status(400).json(error);
    } else {
        res.status(200).json(data);
    }
}

export const posttodraft = async (req, res) => {
    const id_user = decodeToken(req.headers.authorization).userId;
    const { data, error } = await supabase
        .from("dekhor_draft")
        .select('id_draft,title, category, image_link, user:public_dekhor_draft_id_user_fkey(fullname)')
        .eq("id_user", id_user);

    if (error) {
        console.log(error);
        res.status(400).json(error);
    } else {
        res.status(200).json(data);
    }
}

export const posttoprofileblogger = async (req, res) => {
    const fullname = req.params.fullname;
    const { data, error } = await supabase
        .from("dekhor_post")
        .select('id_post, title, category, image_link,fullname')
        .eq("fullname",fullname)

    if (error) {
        console.log(error);
        res.status(400).json(error);
    } else {
        res.status(200).json(data);
    }
}


export const posttocategory = async (req, res) => {
    const { category } = req.params;
    const { data, error } = await supabase.from("dekhor_post").select('id_post,title, category, image_link,save, user:public_dekhor_post_id_user_fkey(fullname)').eq("category", category)
    if (error) {
        console.log(error)
        res.status(400).json(error);
    }
    else {
        res.status(200).json(data);
    }
}

export const detailpost = async (req, res) => {
    const { id_post } = req.params;
    const { data, error } = await supabase.from("dekhor_post")
        .select('id_post,title,content, category, image_link,save, user:public_dekhor_post_id_user_fkey(fullname,profile),pathimage')
        .eq("id_post", id_post)
    if (error) {
        console.log(data)
        res.status(400).json(error);
    }
    else {
        res.status(200).json(data);
    }
}

export const detaildraft = async (req, res) => {
    const { id_draft } = req.params;
    const { data, error } = await supabase.from("dekhor_draft")
        .select('id_draft,title,content, category, image_link, user:public_dekhor_draft_id_user_fkey(fullname,profile),pathimage')
        .eq("id_draft", id_draft)
    if (error) {
        console.log(data)
        res.status(400).json(error);
    }
    else {
        res.status(200).json(data);
    }
}

export const searchblog = async (req,res)=> {
    const {data,error} = await supabase.from("dekhor_post").select('id_post,title, category, image_link,save, user:public_dekhor_post_id_user_fkey(fullname)') 
    if (error){
        console.log(error)
        res.status(400).json(error);
    }
    else{
        res.status(200).json(data);
    }
}

export const searchblogger = async (req,res)=> {
    const {data,error} = await supabase.from("blogger").select('user:public_dekhor_post_id_user_fkey(fullname),profile')
    if (error){
        console.log(error)
        res.status(400).json(error);
    }
    else{
        res.status(200).json(data);
    }
}

export const bloggerdescription = async (req,res)=> {
    const {fullname} = req.params;
    const {data,error} = await supabase.from("user_info").select('description').eq("fullname",fullname)
    if (error){
        console.log(error)
        res.status(400).json(error);
    }
    else{
        res.status(200).json(data);
    }
}




