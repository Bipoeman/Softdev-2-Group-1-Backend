import express from "express";
import {
  getbin,
  getbinbyid,
  getbinbyuserid,
} from "../controllers/pinthebin/getbin.js";
import {
  addbin,
  addpictureController,
} from "../controllers/pinthebin/addbin.js";
import { updatebin } from "../controllers/pinthebin/updatebin.js";
import multer from "multer";
import { getbinreport } from "../controllers/pinthebin/getbinreport.js";
import { deletebin } from "../controllers/pinthebin/deletebin.js";
import { addbinreport } from "../controllers/pinthebin/addbinreport.js";
import { findbinlike } from "../controllers/pinthebin/findbinlike.js";
import { validaccesstoken } from "../controllers/token/validaccesstoken.js";
import { addpictureReportController } from "../controllers/pinthebin/addbinreport.js";
import { updatereport } from "../controllers/pinthebin/updatereport.js";
import { getacceptreport } from "../controllers/pinthebin/getacceptreport.js";

const uploadpicture = multer();
const router = express.Router();

router.get("", (req, res) => {
  res.send("test in pinthebin");
});

router.get("/bin", getbin);

router.get("/find", findbinlike);

router.get("/bin/:id", getbinbyid);

router.get("/mybin", validaccesstoken, getbinbyuserid);

//add bin_info
router.post("/bin", validaccesstoken, addbin);

// add picture to bin_info

router.post("/bin/upload", uploadpicture.single("file"), addpictureController);

//update bin_info
router.put("/bin", validaccesstoken, updatebin);

// delete bin_info
router.delete("/bin/:id", deletebin);
//show bin report
router.get("/report", getbinreport);

router.get("/accept", getacceptreport);

router.get("/reject", getacceptreport);

router.post("/report", validaccesstoken, addbinreport); //add report

router.post(
  "/report/upload",
  uploadpicture.single("file"),
  addpictureReportController
); //add picture to report

router.put("/report", validaccesstoken, updatereport);

// last 3 is app report is portal app report

export default router;
