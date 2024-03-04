import supabase from "../database/database.js";
import { decodeToken } from "../token/token.js";

// export const deletepost = async (req,res)=>{
//     const {id_post} = req.params;
//     const {error} = await supabase.from("dekhor_post").delete().eq('id_post', id_post)
//     if (error){
//         res.status(500).json(error);
//     }
//     else{
//         res.status(200).json({msg:"success"})
//     }
// }

export const deletepost = async (req, res) => {
    try {
        const { id_post } = req.params;

        const { data: postData, error: fetchError } = await supabase
            .from("dekhor_post")
            .select("image_link")
            .eq("id_post", id_post)
            .single(); 

        if (fetchError) {
            throw fetchError;
        }
        if (!postData) {
            throw new Error("Post not found.");
        }


        const imagePath = postData.image_link.split('/').pop();
        await supabase.storage.from("dekhor").remove([imagePath]);

        const { error: deletePostError } = await supabase
            .from("dekhor_post")
            .delete()
            .eq('id_post', id_post);

        if (deletePostError) {
            throw deletePostError;
        }

        res.status(200).json({ msg: "success" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}




export const deletedraft = async (req, res) => {
    const { id_draft } = req.params;
    const { data: postData, error: fetchError } = await supabase
        .from("dekhor_draft")
        .select("image_link")
        .eq("id_draft", id_draft)
        .single();

    if (fetchError) {
        throw fetchError;
    }
    if (!postData) {
        throw new Error("Post not found.");
    }
    const imagePath = postData.image_link.split('/').pop();
    await supabase.storage.from("dekhor").remove([imagePath]);
    const { error } = await supabase.from("dekhor_draft").delete().eq('id_draft', id_draft)
    if (error) {
        res.status(500).json(error);
    }
    else {
        res.status(200).json({ msg: "success" })
    }
}

export const unsave = async (req, res) => {
    const id_user = decodeToken(req.headers.authorization).userId;
    const { id_post } = req.params;
    const { error } = await supabase.from("dekhor_savepost").delete().eq('id_user', id_user).eq('id_post', id_post)
    if (error) {
        res.status(500).json(error);
    }
    else {
        res.status(200).json({ msg: "success" })
    }
}

export const deletereport = async (req, res) => {
    const { id_report } = req.params;
    const { error } = await supabase.from("dekhor_report").delete().eq('id_report', id_report)
    if (error) {
        res.status(500).json(error);
    }
    else {
        res.status(200).json({ msg: "success" })
    }
}

