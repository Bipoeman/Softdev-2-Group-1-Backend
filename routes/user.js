import express from "express";
import { uploadprofilecontroller } from "../controllers/user/uploadprofile.js";
import multer from "multer";
import {changeprofile} from "../controllers/user/changeprofile.js";
import {changepassword} from "../controllers/user/changepassword.js";
import {resetpassword} from "../controllers/user/resetpassword.js";
import {refreshtoken} from "../controllers/token/refreshaccesstoken.js";
import {getuserdata} from "../controllers/user/getuserdata.js";
import {getuserdatabyid} from "../controllers/user/getuserdatabyid.js";
import {validaccesstoken} from "../controllers/token/validaccesstoken.js";


const uploadprofile = multer();
const router = express.Router();

// all that is path  url/user
router.get("", getuserdata);


router.get("/id",validaccesstoken, getuserdatabyid);

router.post("/upload",validaccesstoken,uploadprofile.single("file"),uploadprofilecontroller);

router.put("",validaccesstoken,changeprofile);


router.put("/changepassword",validaccesstoken,changepassword);

router.put("/resetpassword",resetpassword)


router.get("/refresh",refreshtoken)
export default router;