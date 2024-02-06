import express from "express";
import {uploadpinthebin} from "../controllers/multer.js";
import fs from "fs";
import path from "path";
import {decodeToken} from "../controllers/token/token.js";

const router = express.Router();

router.get("", (req, res) => {
    res.send("test in pinthebin")
})

router.post("/upload", uploadpinthebin.single("file"), (req, res) => {
    const id = req.body.id;
    console.log(req.file);
    const fileNameWithExtension = `bin_${id}` + path.extname(req.file.originalname)
    fs.rename(req.file.path, path.join(req.file.destination, fileNameWithExtension), (err) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log("rename success");
        }
    })
    res.send("upload success")
})

export default router;