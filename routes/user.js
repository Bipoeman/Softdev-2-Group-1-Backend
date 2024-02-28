import express from "express";
import supabase from "../controllers/database/database.js";
import { decodeToken } from "../controllers/token/token.js";
import { uploadprofilecontroller } from "../controllers/user/uploadprofile.js";
import multer from "multer";
import {changeprofile} from "../controllers/user/changeprofile.js";
import {changepassword} from "../controllers/user/changepassword.js";
import {resetpassword} from "../controllers/user/resetpassword.js";
import {refreshtoken} from "../controllers/token/refreshaccesstoken.js";


const uploadprofile = multer();
const router = express.Router();

// all that is path  url/user
router.get("", async (req, res) => {
    const {data, error} = await supabase.from("user_info").select("*");
    if (error) {res.status(500).send(error)} 
    else{
        res.send(data)
    }
});


router.get("/id", async (req, res) => {
    const id = decodeToken(req.headers.authorization).userId;
    const {data, error} = await supabase.from("user_info").select("*").eq("id", id);
    if (error) {res.status(500).send(error)} 
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

router.put("",changeprofile);


router.put("/changepassword",changepassword);

router.put("/resetpassword",resetpassword)


router.get("/refresh",refreshtoken)
export default router;