import express from "express";
import { uploadprofilecontroller } from "../controllers/user/uploadprofile.js";
import multer from "multer";
import {changeprofile} from "../controllers/user/changeprofile.js";
import {changepassword} from "../controllers/user/changepassword.js";
import {sendotp} from "../controllers/user/sendotp.js";
import {refreshtoken} from "../controllers/token/refreshaccesstoken.js";
import {getuserdata} from "../controllers/user/getuserdata.js";
import {getuserdatabyid} from "../controllers/user/getuserdatabyid.js";
import {validaccesstoken} from "../controllers/token/validaccesstoken.js";
import {resetpassword} from "../controllers/user/resetpassword.js";
import {changeemail} from "../controllers/user/changeemail.js";
import { updateavatar } from "../controllers/user/updateavatar.js";
import {userdashboardcontroller} from "../controllers/user/dashboard.js";
import {deleteuser} from "../controllers/user/deleteuser.js";
import {getUsernameFromID} from "../controllers/user/active.js";


const uploadprofile = multer();
const router = express.Router();

// all that is path  url/user
router.get("", getuserdata);

// get avatar in this 
router.get("/id",validaccesstoken, getuserdatabyid);

router.post("/upload",validaccesstoken,uploadprofile.single("file"),uploadprofilecontroller);

router.put("",validaccesstoken,changeprofile);

router.put("/changeemail",validaccesstoken,changeemail)

router.put("/changepassword",validaccesstoken,changepassword);

router.get("/otp",sendotp)

router.put("/reset",resetpassword)

// insert and update avatar 
router.put("/avatar",validaccesstoken,updateavatar)

// user dashboard
router.get("/dashboard",validaccesstoken,userdashboardcontroller)

router.get("/refresh",refreshtoken)

router.delete("/delete",deleteuser)

router.get("/active",getUsernameFromID)

export default router;