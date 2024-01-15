export const registerController = (req, res) => {

    const username = req.body.username;
    const password = req.body.password;
    const passwordagain = req.body.passwordagain;
    if (username === "admin" && password === "admin" && passwordagain === "admin") {
        res.send("register success");
    }
    else {
        res.status(401).send("register fail");
    }
}

