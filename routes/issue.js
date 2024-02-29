import express from "express";
import {validaccesstoken} from "../controllers/token/validaccesstoken.js";
import {addissue} from "../controllers/issue/addissue.js";
import {getallissue} from "../controllers/issue/getallissue.js";
import {addpictureissue} from "../controllers/issue/addpictureissue.js";

const router = express.Router();

router.get("",getallissue);

router.post("",validaccesstoken,addissue)

router.post("/upload",addpictureissue)

export default router;