import supabase from "../database/database.js";
import {decodeToken} from "../token/token.js";

export const addbin = async (req, res) => {
    const userId = decodeToken(req.headers.authorization).userId;
    const {location, description = null, latitude, longitude,picture = null,bintype} = req.body;
    const {data, error} = await supabase.schema("bin_info").from("bin_info").select("*").eq("latitude", latitude).eq("longitude", longitude);
    if(error) throw error;
    else if(data.length > 0) {
        return res.status(400).send("Bin already exists");
    }
    else{
        const {data, error} = await supabase.schema("bin_info").from("bin_info").insert([{location, description, latitude, longitude, picture, bintype, user_id: userId}]);
        if(error) throw error;
        else {
            return res.status(201).send(data);
        }
    }
};