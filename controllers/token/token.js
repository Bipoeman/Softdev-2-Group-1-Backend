import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

config();
const secretKey = process.env.secretKey

export const verifyToken = (rawToken) => {
    if (!rawtoken) {
        // Handle the missing token scenario, e.g., return false or throw an error
        return false;
    }
    let authorized = false;

    // Extract the token without the "Bearer" prefix
    const token = rawtoken.split(" ")[1];
    console.log(token)

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            console.log('Invalid token', err);

        } else {
            console.log('Decoded token:', decoded);
            authorized = true;
        }
    });
    return authorized;
};

export const signToken = (id, name) =>{
    return jwt.sign({userId: id, name: name}, secretKey, {expiresIn: '1h'});
}

export const decodeToken = (token) =>{
    return jwt.decode(token);
}