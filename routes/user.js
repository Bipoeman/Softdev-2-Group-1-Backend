import express from "express";
import supabase from "../controllers/database/database.js";
import { decodeToken } from "../controllers/token/token.js";
import { uploadprofilecontroller } from "../controllers/uploadprofile.js";
import multer from "multer";

const uploadprofile = multer();
const router = express.Router();

// all that is path  url/user
router.get("", async (req, res) => {
    const {data, err} = await supabase.schema("public").from("user_info").select("*");
    if (err) throw err;
    else{
        res.send(data)
    }
});


router.get("/id", async (req, res) => {
    const id = decodeToken(req.headers.authorization).userId;
    const {data, err} = await supabase.schema("public").from("user_info").select("*").eq("id", id);
    if (err) throw err;
    else{
        if(data.length === 0){
            res.status(404).send("user not found")
        }   
        else{
            res.send(data[0])
        }
    }
});

router.post("/upload",uploadprofile.single("file"),uploadprofilecontroller);

export default router;