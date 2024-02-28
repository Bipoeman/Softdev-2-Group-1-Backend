import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

config();
const acesssecretKey = process.env.acesssecretKey
const refreshsecretKey = process.env.refreshsecretKey

export const verifyToken = (rawToken) => {
    if (!rawToken) {
        // Handle the missing token scenario, e.g., return false or throw an error
        return false;
    }
    let authorized = false;
    // Extract the token without the "Bearer" prefix
    const token = rawToken.split(" ")[1];
    console.log(token)

    jwt.verify(token, acesssecretKey, (err, decoded) => {
        if (err) {
            console.log('Invalid token', err);

        } else {
            console.log('Decoded token:', decoded);
            authorized = true;
        }
    });
    return authorized;
};

export const accesssigntoken = (id, role) =>{
    return jwt.sign({userId: id, role: role}, acesssecretKey, {expiresIn: '1h'});
}


export const refeshsigntoken = (id,role) =>{
    return jwt.sign({userId: id, role: role}, refreshsecretKey, {expiresIn: '1d'})
}
export const decodeToken = (token) =>{
    const raw = token.split(" ")[1];
    return  jwt.verify(raw, acesssecretKey);

}