import {decodeToken, signToken} from "../token/token.js";

export const renewtoken = async (req, res) => {
    const user = decodeToken(req.headers.authorization);
    res.wsend(signToken(user.userId, user.role));
};