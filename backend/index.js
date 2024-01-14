import express from 'express';
import login from './routes/login.js';
import register from './routes/register.js';
import { verifyToken } from "./controllers/token/token.js";
import { config } from 'dotenv';

config();
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


let PUBLIC_PATH = ["/login", "/register"];


app.use((req, res, next) => {
    if (!(PUBLIC_PATH.includes(req.path))) {
        console.log("Header: ", req.headers.authorization);
        const result = verifyToken(req.headers.authorization);
        if (result === true) {
            next();
        }
    } else {
        next();
    }
});


app.use("/login", login);
app.use("/register", register);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});