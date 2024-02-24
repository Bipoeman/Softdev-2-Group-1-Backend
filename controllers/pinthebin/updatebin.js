import {decodeToken} from "../token/token.js";

export const updatebin = async (req,res) => {
    const user_id = decodeToken(req.headers.authorization).userId;
    const {location , description = null , bintype , latitude ,longitude} = req.body;
    const {data,error} = await supabase.from("bin_info").update([
        {
            location,
            description,
            bintype,
            user_update:user_id
        }
    ]).eq("latitude",latitude).eq("longitude",longitude).select("*");
    if (error) {res.status(500).send(error)}
    else {
        res.send(data);
    }
}