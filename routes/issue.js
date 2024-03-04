import express from "express";
import {validaccesstoken} from "../controllers/token/validaccesstoken.js";
import {addissue} from "../controllers/issue/addissue.js";
import {getallissue} from "../controllers/issue/getallissue.js";
import multer from "multer";
import {getacceptissue} from "../controllers/issue/getacceptissue.js";
import {getrejectissue} from "../controllers/issue/getrejectissue.js";
import {adminresponse} from "../controllers/issue/adminresponse.js";
import {getruammitrissue} from "../controllers/issue/getruammitrissue.js";
import {getpinthebinissue} from "../controllers/issue/getpinthebinissue.js";
import {getdekhorissue} from "../controllers/issue/getdekhorissue.js";
import {getrestroomissue} from "../controllers/issue/getrestroomissue.js";

const router = express.Router();
const upload = multer();
router.get("",getallissue);

router.get("/accept",validaccesstoken,getacceptissue);

router.get("/reject",validaccesstoken,getrejectissue);

router.get("/ruammitr",validaccesstoken,getruammitrissue);
router.get("/pinthebin",validaccesstoken,getpinthebinissue);
router.get("/restroom",validaccesstoken,getrestroomissue);
router.get("/dekhor",validaccesstoken,getdekhorissue);


router.post("",validaccesstoken,upload.single("file"),addissue)

router.put("",validaccesstoken,adminresponse)


export default router;