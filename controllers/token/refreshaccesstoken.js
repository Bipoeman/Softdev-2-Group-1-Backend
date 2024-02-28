import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import {accesssigntoken, refeshsigntoken} from "./token.js";
import supabase from "../database/database.js";


config();
const refreshsecretKey = process.env.refreshsecretKey

export const refreshtoken = (req,res) => {
    const token =  req.headers.authorization.split(" ")[1];
    jwt.verify(token,refreshsecretKey,async (err, decode) => {
        if (err) {
            res.status(403).json({
                msg: "go to login page 101 "
            })
        } else {
            const userid = decode.userId;
            const role = decode.role;
            const {data, error} = await supabase.from("user_info")
                .select("*").eq("id",userid)
            if (error) {res.status(500).send(error)}
            else if (data.length === 0){res.status(403).json({
                msg: "go to login page"
            })}
            else {
                const accesssjwt = accesssigntoken(userid, role);
                const refreshjwt = refeshsigntoken(userid, role);
                res.json({accesssjwt, refreshjwt})
            }
        }
    })
}