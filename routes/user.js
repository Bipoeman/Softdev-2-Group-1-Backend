import express from "express";
import conn from "../controllers/database/database.js";
import {decodeToken} from "../controllers/token/token.js";
import {uploadprofile} from "../controllers/multer.js";
import path from "path";
import fs from "fs";

const router = express.Router();

// all that is path  url/user

router.get("", (req, res) => {
    const command = "select * from user_info";
    conn.query(command, (err, result) => {
        if (err) throw err;
        res.status(200).json(result);
    })
})

router.get("/:id", (req, res) => {
    const id = req.params.id;
    const command = "select * from user_info where id = ?" ;
    conn.query(command, [id], (err, result) => {
        if (err) throw err;
        else if (result.length !== 1) {
            return res.status(404).json({error: true, message: 'user not found'});
        } else {
            res.status(200).json(result[0]);
        }
    })
})

router.post("/upload",uploadprofile.single('file') ,(req, res) => {
    const id = decodeToken(req.headers.authorization).userId;
    const  file = req.file;
    const command = "update user_info set profile = ? where id = ?";
    const fileNameWithExtension = `profile_${id}` + path.extname(req.file.originalname)
    fs.rename(file.path, path.join(file.destination, fileNameWithExtension), (err) => {
        if (err) throw err;
    });
    conn.query(command, [path.join(file.destination, fileNameWithExtension), id], (err, result) => {
        if (err) throw err;
        res.status(200).json({message: "profile updated"});
    })

}) ;
export default router;