import express from "express";
import {getbin, getbinbyid} from "../controllers/pinthebin/getbin.js";
import {addbin, addpictureController} from "../controllers/pinthebin/addbin.js";
import {updatebin} from "../controllers/pinthebin/updatebin.js";
import multer from "multer";
import {getbinreport} from "../controllers/pinthebin/getbinreport.js";
import {deletebin} from "../controllers/pinthebin/deletebin.js";
import {addbinreport} from "../controllers/pinthebin/addbinreport.js";
import { findbinlike } from "../controllers/pinthebin/findbinlike.js";

const uploadpicture = multer();
const router = express.Router();

router.get("", (req, res) => {
    res.send("test in pinthebin")
})

router.get("/bin",getbin)

router.get("/bin/:id",getbinbyid )


router.get("/find", findbinlike);
//add bin_info
router.post("/bin", addbin);

// add picture to bin_info

router.post("/bin/upload",uploadpicture.single("file"),addpictureController);

//update bin_info
router.put("/bin", updatebin);

// delete bin_info
router.delete("/bin/:id",deletebin);
//show bin report
router.get("/report",getbinreport);

router.post("/report",addbinreport); //add report

// last 3 is app report is portal app report


export default router;