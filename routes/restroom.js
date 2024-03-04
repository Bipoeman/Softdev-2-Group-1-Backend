import express from "express";
import multer from "multer";
import { validaccesstoken } from "../controllers/token/validaccesstoken.js";
import { getreview } from "../controllers/restroom/getreview.js";
import { addtoilet } from "../controllers/restroom/addtoilet.js";
import { gettoilet } from "../controllers/restroom/getToilet.js";
import { uploadtoiletpicture } from "../controllers/restroom/uploadtoiletpicture.js";
import { uploadtoiletcomment } from "../controllers/restroom/uploadtoiletcomment.js";
import { addcomment } from "../controllers/restroom/addcomment.js";
import { getavgstar } from "../controllers/restroom/getavgstar.js";
import { deletetoilet } from "../controllers/restroom/deletetoilet.js";
import { pinreport } from "../controllers/restroom/pinreport.js";
import { gettoiletbyid } from "../controllers/restroom/getToiletByID.js";
import {getreport} from "../controllers/restroom/getreport.js";
import {getacceptreport} from "../controllers/restroom/getacceptreport.js";
import {getrejectreport} from "../controllers/restroom/getrejectreport.js";
import {updatetoiletreport} from "../controllers/restroom/updatetoiletreport.js";
import {edittoilet} from "../controllers/restroom/edittoilet.js";

const uploadfile = multer();
const router = express.Router();

// get data of toliet
router.get("/", gettoilet); // get all toilet

// create toliet
router.post("/", validaccesstoken, addtoilet);

router.get("/mytoilet", validaccesstoken, gettoiletbyid); // get toilet by user id

router.delete("/:id", validaccesstoken, deletetoilet); // delete toilet

router.put("/:id", validaccesstoken, edittoilet); // edit toilet

router.get("/report",getreport)

router.get("/report/accept", getacceptreport);// get report toilet

router.get("/report/accept", getrejectreport);

router.post("/report", validaccesstoken, uploadfile.single("file"), pinreport);// report toilet

router.put("/report/updatereport", validaccesstoken,updatetoiletreport); // edit repor

// get star and comment to something
router.get("/review/:id", getreview);

router.get("/review", getavgstar);

// create comment for toliet
router.post("/review", validaccesstoken, addcomment);

router.post("/upload", uploadfile.single("file"), uploadtoiletpicture);

router.post("/upload/review", uploadfile.single("file"), uploadtoiletcomment);


export default router;
