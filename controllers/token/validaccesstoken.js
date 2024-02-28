import jwt from "jsonwebtoken";
import { config } from 'dotenv';
config()
const acesssecretKey = process.env.acesssecretKey


export const validaccesstoken = (req,res,next) => {
    const authHeader = req.headers.authorization
    if(!authHeader){res.status(403).json({msg : 'Unauthorized: Missing access token'})}
    const token = authHeader.split(' ')[1];
    jwt.verify(token, acesssecretKey, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Forbidden: Invalid access token' });
        }
        next(); // Allow the request to proceed
    });
}