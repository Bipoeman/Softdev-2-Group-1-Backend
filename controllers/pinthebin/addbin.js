import supabase from "../database/database.js";
import {decodeToken} from "../token/token.js";

export const addbin = async (req, res) => {
    const userId = decodeToken(req.headers.authorization).userId;
    const {location , description = null , bintype , latitude ,longitude} = req.body;
    const {data,error} = await supabase.from("bin_info").select("*").eq("latitude",latitude).eq("longitude",longitude);
    if (error) throw error;
    else if (data.length === 0 ){
        const {data, error} = await supabase.from("bin_info").insert([{
            location,
            description,
            bintype,
            latitude,
            longitude,
            user_update:userId
        }]).select();
        if (error) throw error;
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
    if (error) throw error;
    else if (data[0].picture === null) {
        const {data: datapicture, err} = await supabase.storage.from("bin").upload(newfilename, file.buffer, {
            contentType: newminetype
        });
        if (err) throw err;
        else {
            const url = `https://pyygounrrwlsziojzlmu.supabase.co/storage/v1/object/public/${datapicture.fullPath}`;
            const {
                data,
                err
            } = await supabase.from("bin_info").update({picture: url}).eq("id", binId).select();
            if (err) throw err;
            else {
                res.send(data);
            }
        }
    } else {
        const {data, err} = await supabase.storage.from("bin").update(newfilename, file.buffer, {
            contentType: newminetype
        });
        if (err) throw err;
        else {
            res.send(data)
        }
    }
}