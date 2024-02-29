import supabase from "../database/database.js";

export const getrandompost = async (req,res) => {
    const { data, error } = await supabase
        .from('dekhor_random')
        .select('id_post,title, category, image_link, user:public_dekhor_post_id_user_fkey(fullname)')
        .limit(6);
    if (error) {
        console.error('Error fetching random rows:', error);
    } else {
        res.status(200).json(data);
    }
}