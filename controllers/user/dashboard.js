import supabase from "../database/database.js";
import {decodeToken} from "../token/token.js";

export const userdashboardcontroller = async (req, res) => {
    const id = decodeToken(req.headers.authorization).userId;
    let infos = {};
    let errors = {};
    (infos.ruam_mitr, errors.ruam_mitr) = await supabase
        .from("user_info")
        .select("id, email, fullname, username, phonenum, birthday, profile, role, description, avatar")
        .eq("id", id);
    (infos.dekhor, errors.dekhor) = await supabase
        .from("dekhor_post")
        .select('id_post, title, category, image_link, save, user:public_dekhor_post_id_user_fkey(fullname)')
        .eq("id_user", id);
    (infos.pin_the_bin, errors.pin_the_bin) = await supabase
        .from("bin_info")
        .select("*")
        .eq("user_update", id);
    (infos.restroom, errors.restroom) = await supabase
        .from("toilet_info")
        .select("*")
        .eq("user_id", id);
    if (Object.keys(errors).length !== 0) {
        res.status(500).send(errors);
    } else {
        res.status(200).send(infos);
    }
}
