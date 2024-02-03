import express from 'express';
import multer from 'multer';
import login from './routes/login.js';
import register from './routes/register.js';
import PinTheBin from "./routes/pinthebin.js"
import { verifyToken } from "./controllers/token/token.js";
import { config } from 'dotenv';
import market from "./routes/market.js";
import restroom from "./routes/restroom.js";
import dekhor from './routes/dekhor.js';

config();
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
})
const upload = multer({storage});



let PUBLIC_PATH = ["/user","/login", "/register", "/", "/test"];


app.use((req, res, next) => {
    if (!PUBLIC_PATH.includes(req.path)) {
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

app.use("/uploads", express.static('uploads'));
app.use("/login", login);
app.use("/register", register);
app.use("/pinthebin",PinTheBin);
app.use("/market",market);
app.use("/restroom",restroom);
app.use("/dekhor",dekhor)

app.get('/', (req, res) => {
    res.send('Hello World!');
});




app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});