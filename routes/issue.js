import express from "express";
import {validaccesstoken} from "../controllers/token/validaccesstoken.js";
import {addissue} from "../controllers/issue/addissue.js";
import {getallissue} from "../controllers/issue/getallissue.js";
import multer from "multer";

const router = express.Router();
const upload = multer();
router.get("",getallissue);

router.post("",validaccesstoken,upload.single("file"),addissue)


export default router;