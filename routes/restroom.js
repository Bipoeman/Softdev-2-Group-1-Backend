import express from "express";
import multer from "multer";
import supabase from "../controllers/database/database.js";
import {addtoilet} from "../controllers/restroom/addtoilet.js";
import {gettoilet} from "../controllers/restroom/getToilet.js";


const uploadfile = multer();
const router = express.Router();


// get data of toliet
router.get("/", gettoilet);


// create toliet
router.post("/toliet",addtoilet);

// get star to something
router.post("/star", async (req, res) => {

})

router.post("/upload/toilet", uploadfile.single("file"),uploadtoiletpicture);

router.post("/upload/comment", uploadfile.single("file"),uploadtoiletcomment);

// create comment for toliet
router.post("/comment", (req, res) => {
});


export default router;