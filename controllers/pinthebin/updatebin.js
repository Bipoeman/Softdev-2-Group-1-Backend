import {decodeToken} from "../token/token.js";

export const updatebin = async (req,res) => {
    const user_id = decodeToken(req.headers.authorization).userId;
    let { location, lat, lng, description = null, picture, binType } = req.body;
}