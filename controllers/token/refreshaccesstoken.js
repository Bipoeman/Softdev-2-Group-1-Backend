import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

config();
const refreshsecretKey = process.env.refreshsecretKey

export const refreshtoken = (req,res) => {
    jwt.verify(req.headers.authorization,refreshsecretKey,(err,decode)=>{
        if(err){
            res.status(403).json({
                msg : "go to login page"
            })
        }
        else {

        }
    })
}