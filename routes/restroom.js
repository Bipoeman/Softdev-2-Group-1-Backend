import express from "express";
import multer from "multer";
import { avgstar } from "../controllers/restroom/avgstar.js";
import { addtoilet } from "../controllers/restroom/addtoilet.js";
import { gettoilet } from "../controllers/restroom/getToilet.js";
import { uploadtoiletpicture } from "../controllers/restroom/uploadtoiletpicture.js";
import { uploadtoiletcomment } from "../controllers/restroom/uploadtoiletcomment.js";
import { addcomment } from "../controllers/restroom/addcomment.js";

const uploadfile = multer();
const router = express.Router();

// get data of toliet
router.get("/", gettoilet);

// create toliet
router.post("/toilet", addtoilet);

// get star to something
router.post("/star", avgstar);

router.post("/upload/toilet", uploadfile.single("file"), uploadtoiletpicture);

router.post("/upload/comment", uploadfile.single("file"), uploadtoiletcomment);

// create comment for toliet
router.post("/comment", addcomment);

export default router;
