import supabase from "../database/database.js";
import {decodeToken} from "../token/token.js";

export const uploadprofilecontroller = async (req, res) => {
    const file = req.file;
    const id = decodeToken(req.headers.authorization).userId;
    const newminetype = "image/jpeg";
    const newfilename = `profile_${id}.jpeg`
    const {data, error} = await supabase.from("user_info").select("profile").eq("id", id);
    if (error) throw error;
    else if (data[0].profile === null) {
        const {data: datapicture, error} = await supabase.storage.from("profile").upload(newfilename, file.buffer, {
            contentType: newminetype
        });
        if (error) {res.status(500).send(error)}
        else {
            const url = `https://pyygounrrwlsziojzlmu.supabase.co/storage/v1/object/public/${datapicture.fullPath}`;
            const {
                data,
                error
            } = await supabase.from("user_info").update({profile: url}).eq("id", id).select();
            if (error) {res.status(500).send(error)}
            else {
                res.send(data);
            }
        }
    } else {
        const {data, error} = await supabase.storage.from("profile").update(newfilename, file.buffer, {
            contentType: newminetype
        });
        if (error) {res.status(500).send(error)}
        else {
            res.send(data)
        }
    }
}