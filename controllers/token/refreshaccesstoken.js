import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import {accesssigntoken, refeshsigntoken} from "./token.js";

config();
const acesssecretKey = process.env.acesssecretKey
const refreshsecretKey = process.env.refreshsecretKey

export const refreshtoken = (req,res) => {
    jwt.verify(req.headers.authorization,refreshsecretKey,(err,decode)=>{
        if(err){
            res.status(403).json({
                msg : "go to login page"
            })
        }
        else {
            const userid = decode.userId;
            const role = decode.role;
            // check user is valid
            const accesssjwt = accesssigntoken(userid,role);
            const refreshjwt = refeshsigntoken(user.id,user.role);
            res.json({accesssjwt,refreshjwt})
        }
    })
}