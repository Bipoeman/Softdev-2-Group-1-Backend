import supabase from "../database/database.js";
import {decodeToken} from "../token/token.js";

export const addbin = async (req, res) => {
    const userId = decodeToken(req.headers.authorization).userId;
    const {location , description = null , bintype  , latitude ,longitude} = req.body;
    const {data,error} = await supabase.from("bin_info").select("*").eq("latitude",latitude).eq("longitude",longitude);
    if (error) {res.status(500).send(error)}
    else if (data.length === 0 ){
        const {data, error} = await supabase.from("bin_info").insert([{
            location,
            description,
            bintype,
            latitude,
            longitude,
            user_update:userId
        }]).select();
        if (error) {res.status(500).send(error)}
        else {
            res.send(data);
        }
    }
    else {
        res.send("bin already exist");
    }
};

export const addpictureController = async (req, res) => {
    const file = req.file;
    const binId = req.body.id;
    const newminetype = "image/jpeg";
    const newfilename = `bin_${binId}.jpeg`;
    let {data, error} = await supabase.from("bin_info").select("*").eq("id", binId);
    if (error) {res.status(500).send(error)}
    else if (data[0].picture === null) {
        const {data: datapicture, error} = await supabase.storage.from("bin").upload(newfilename, file.buffer, {
            contentType: newminetype
        });
        if (error) {res.status(500).send(error)}
        else {
            const url = `https://pyygounrrwlsziojzlmu.supabase.co/storage/v1/object/public/${datapicture.fullPath}`;
            const {
                data,
                error
            } = await supabase.from("bin_info").update({picture: url}).eq("id", binId).select();
            if (error) {res.status(500).send(error)}
            else {
                res.send(data);
            }
        }
    } else {
        const {data, error} = await supabase.storage.from("bin").update(newfilename, file.buffer, {
            contentType: newminetype
        });
        if (error) {res.status(500).send(error)}
        else {
            res.send(data)
        }
    }
}