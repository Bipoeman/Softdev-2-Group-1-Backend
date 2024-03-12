import express from 'express';
import login from './routes/login.js';
import register from './routes/register.js';
import PinTheBin from "./routes/pinthebin.js"
import { config } from 'dotenv';
import restroom from "./routes/restroom.js";
import dekhor from './routes/dekhor.js';
import cors from 'cors';
import user from "./routes/user.js";
import issue from "./routes/issue.js";
import path from 'path';
import { fileURLToPath } from 'url';

var __dirname = path.dirname(fileURLToPath(import.meta.url));

config();
const app = express();
app.use(cors());
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/login", login);
app.use("/register", register);
app.use("/user", user);
app.use("/pinthebin",PinTheBin);
app.use("/restroom",restroom);
app.use("/dekhor",dekhor)
app.use("/issue",issue)

app.get(
    '/',
    (req, res) => res.sendFile(__dirname + '/web/index.html'),
)

app.get(
    '/delete_user',
    (req, res) => res.sendFile(__dirname + '/web/delete_user/index.html'),
)

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});