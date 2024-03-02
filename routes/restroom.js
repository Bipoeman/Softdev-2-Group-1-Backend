import express from "express";
import multer from "multer";
import { getreview } from "../controllers/restroom/getreview.js";
import { addtoilet } from "../controllers/restroom/addtoilet.js";
import { gettoilet } from "../controllers/restroom/getToilet.js";
import { uploadtoiletpicture } from "../controllers/restroom/uploadtoiletpicture.js";
import { uploadtoiletcomment } from "../controllers/restroom/uploadtoiletcomment.js";
import { addcomment } from "../controllers/restroom/addcomment.js";
import { getavgstar } from "../controllers/restroom/getavgstar.js";
import { edittoilet } from "../controllers/restroom/editToilet.js";
import { deletetoilet } from "../controllers/restroom/deletetoilet.js";

const uploadfile = multer();
const router = express.Router();

// get data of toliet
router.get("/", gettoilet);

// create toliet
router.post("/toilet", addtoilet);

router.post("/edittoilet", edittoilet); // edit toilet

router.delete("/toilet/:id", deletetoilet); // delete toilet

// get star and comment to something
router.get("/review/:id", getreview);

router.get("/review", getavgstar);

router.post("/upload/toilet", uploadfile.single("file"), uploadtoiletpicture);

router.post("/upload/comment", uploadfile.single("file"), uploadtoiletcomment);

// create comment for toliet
router.post("/comment", addcomment);

export default router;
