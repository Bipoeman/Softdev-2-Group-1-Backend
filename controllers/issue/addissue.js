import { decodeToken } from "../token/token.js";
import supabase from "../database/database.js";

export const addissue = async (req, res) => {
    const userId = decodeToken(req.headers.authorization).userId;
    const file = req.file || null;
    const { title, type, description } = req.body
    const { data: dataissue, error } = await supabase.from("user_issue").insert([{
        title,
        type,
        description,
        user_id: userId
    }]).select("*").single();
    if (error) { console.log(error); res.status(500).send(error); }
    else {
        console.log("add data successfully");
        if (file == null) {
            console.log("no file")
            res.send("issue added successfully")
        }
        else {
            console.log("file exist")
            const user_issue_id = dataissue.id;
            const newminetype = "image/jpeg";
            const { data: datapicture, error } = await supabase.storage.from("user_issue")
                .upload(`issue_${user_issue_id}`, file.buffer, {
                    contentType: newminetype
                });
            if (error) { res.status(500).send(error) }
            else {
                const url = `https://pyygounrrwlsziojzlmu.supabase.co/storage/v1/object/public/${datapicture.fullPath}`;
                const { data, error } = await supabase.from("user_issue").update({ picture: url }).eq("id", user_issue_id).select("*");
                if (error) { res.status(500).send(error) }
                else { res.send(data) }
            }
        }
    }
}