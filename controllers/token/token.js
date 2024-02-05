import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

config();
const secretKey = process.env.secretKey

export const verifyToken = (rawToken) => {
    if (!rawToken) {
        // Handle the missing token scenario, e.g., return false or throw an error
        return false;
    }
    let authorized = false;
    // Extract the token without the "Bearer" prefix
    const token = rawToken.split(" ")[1];
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

export const signToken = (id, email) =>{
    return jwt.sign({userId: id, email: email}, secretKey, {expiresIn: '1h'});
}

export const decodeToken = (token) =>{
    const raw = token.split(" ")[1];
    return  jwt.verify(raw, secretKey);

}