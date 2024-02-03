import express from 'express';
import multer from 'multer';
import login from './routes/login.js';
import register from './routes/register.js';
import user from './routes/user.js';
import PinTheBin from "./routes/pinthebin.js"
import { verifyToken } from "./controllers/token/token.js";
import { config } from 'dotenv';

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
app.use("/user",user);
app.use("/pinthebin",PinTheBin);

app.get('/', (req, res) => {
    res.send('Hello World!');
});


app.post("/test",upload.single('file'), (req, res) => {
    const file = req.file;
    const  {ddd,aaa} = req.body;
    console.log(ddd,aaa);
    res.send(file);




    // send picture
    // res.contentType(file.mimetype);
    // // Send the file buffer as the response
    // res.send(file.buffer);
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});