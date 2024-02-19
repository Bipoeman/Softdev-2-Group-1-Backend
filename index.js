import express from 'express';
import login from './routes/login.js';
import register from './routes/register.js';
import PinTheBin from "./routes/pinthebin.js"
import { verifyToken } from "./controllers/token/token.js";
import { config } from 'dotenv';
import restroom from "./routes/restroom.js";
import dekhor from './routes/dekhor.js';
import cors from 'cors';
import user from "./routes/user.js";
import support from "./routes/support.js";
config();
const app = express();
app.use(cors());
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



let authorized_path = ["/user/upload","/support",];


app.use((req, res, next) => {
    if (authorized_path.includes(req.path)) {
        console.log("Header: ", req.headers.authorization);
        const result = verifyToken(req.headers.authorization);
        if (result === true) {
            console.log("Token is valid");
            next();
        }
        else {
            res.status(401).end();
        }
    } else {
        next();
    }
});

app.use("/login", login);
app.use("/register", register);
app.use("/user", user);
app.use("/pinthebin",PinTheBin);
app.use("/restroom",restroom);
app.use("/dekhor",dekhor)
app.use("/support",support)

app.get('/', (req, res) => {
    res.send('Hello World!');
});




app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});