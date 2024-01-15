import { signToken } from "./token/token.js";


export const loginController = (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    if (username === "admin" && password === "admin") {
        res.send(signToken(2, "admin"));
    }
    else {
        res.status(401).send("login fail");
    }
}
