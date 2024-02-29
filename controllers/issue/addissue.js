import {decodeToken} from "../token/token.js";

export const addissue = async (req,res) =>{
    const userId = decodeToken(req.headers.authorization).userId;
    const {title,type,description}=req.body
}