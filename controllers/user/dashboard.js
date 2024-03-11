import supabase from "../database/database.js";
import {decodeToken} from "../token/token.js";

export const userdashboardcontroller = async (req, res) => {
    const id = decodeToken(req.headers.authorization).userId;
    let infos = {};
    let errors = {};

    var {data, error} = await supabase
        .from("user_info")
        .select("id, email, fullname, username, phonenum, birthday, profile, role, description, avatar")
        .eq("id", id);
    if (error) {
        errors.user_info = error;
    } else {
        infos.user_info = data[0];
    }

    var {data, error} = await supabase
        .from("dekhor_post")
        .select('id_post, title, category, image_link, save, user:public_dekhor_post_id_user_fkey(fullname)')
        .eq("id_user", id);
    if (error) {
        errors.dekhor_post = error;
    } else {
        infos.dekhor_post = data;
    }

    var {data, error} = await supabase
        .from('dekhor_savepost')
        .select('post:dekhor_post(id_post,title,category,image_link,save),fullname_blogger')
        .eq("id_user", id)
    if (error) {
        errors.dekhor_savedpost = error;
    } else {
        infos.dekhor_savedpost = data;
    }

    var {data, error} = await supabase
        .from("bin_info")
        .select("*")
        .eq("user_update", id);
    if (error) {
        errors.bin_info = error;
    } else {
        infos.bin_info = data;
    }

    var {data, error} = await supabase
        .from("toilet_info")
        .select("*")
        .eq("user_id", id);
    if (error) {
        errors.toilet_info = error;
    } else {
        infos.toilet_info = data;
    }

    if (Object.values(errors).some((error) => error !== null)) {
        res.status(404).send(errors);
    } else {
        res.status(200).send(infos);
    }
}
