import supabase from "../database/database.js";
import {decodeToken} from "../token/token.js";

export const addpost = async (req, res) => {
    const id_user = decodeToken(req.headers.authorization).userId;
    const {id_post,title,content,category,image_link,fullname} = req.body;
    const { data, error } = await supabase
            .from("dekhor_post") 
            .insert({
                id_post,
                title,
                content,
                category,
                image_link,
                fullname,
                id_user,
            });
    if (error){
        res.status(500).json({ msg: error.message });
    }
    else{
        res.status(200).json(data);

    }
};

export const draftpost = async (req, res) => {
    const id_user = decodeToken(req.headers.authorization).userId;
    const {id_post,title,content,category,image_link} = req.body;
    const { data, error } = await supabase
            .from("dekhor_draft") 
            .insert({
                id_post,
                title,
                content,
                category,
                image_link,
                id_user,
            });
    if (error){
        res.status(500).json({ msg: error.message });
    }
    else{
        res.status(200).json(data);

    }
};

export const addtitlepicture = async (req, res) => {
    const file = req.file;
    const id_post = req.body;
    const newminetype = "image/jpeg";
    const newfilename = `dekhorblog_${id_post}.jpeg`;
    let {data, error} = await supabase.from("dekhor_post").select("image_link").eq("id_post", id_post);
    if (error) throw error;
    else if (data[0].picture === null) {
        const {data: datapicture, err} = await supabase.storage.from("dekhor").upload(newfilename, file.buffer, {
            contentType: newminetype
        });
        if (err) throw err;
        else {
            const url = `https://pyygounrrwlsziojzlmu.supabase.co/storage/v1/object/public/${datapicture.fullPath}`;
            const {
                data,
                err
            } = await supabase.from("create_post").update({image_link: url}).eq("id", id_post).select();
            if (err) throw err;
            else {
                res.send(data);
            }
        }
    } else {
        const {data, err} = await supabase.storage.from("dekhor").update(newfilename, file.buffer, {
            contentType: newminetype
        });
        if (err) throw err;
        else {
            res.send(data)
        }
    }
}


export const savepost = async (req,res) =>{
    const id_user = decodeToken(req.headers.authorization).userId;
    const {id_post} = req.params;
    const {fullname,fullname_blogger} = req.body;
    const {data,error} = await supabase.from("dekhor_savepost").insert({id_user,id_post,fullname,fullname_blogger})
    if (error ){
        res.status(500).json(error);
    }
    else{
        console.log(data);
        res.status(200).json(data);
    }
}

export const numsave = async (req,res) =>{
    const {id_post} = req.params;
    const {save} = req.body;
    const {data,error} = await supabase.from("dekhor_post").update({save}).eq("id_post",id_post)
    if (error ){
        res.status(500).json(error);
    }
    else{
        console.log(data);
        res.status(200).json(data);
    }
}

export const commentpost = async (req,res) =>{
    const id_user = decodeToken(req.headers.authorization).userId;
    const {comment,id_post} = req.body;
    const {data,error} = await supabase.from("dekhor_comment").insert({id_user,id_post,comment})
    if (error ){
        res.status(500).json({ msg: error.message });
    }
    else{
        res.status(200).json(data);
    }
}

export const blogger = async (req, res) => {
    const { data, error } = await supabase.from('distinct_id').select('user:profiles(id, username),image: profiles(avatar_url)');
    if (error) {
        console.error(error);
        res.status(400).json(error);
    } else {
        res.status(200).json(data);
    }
}

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

