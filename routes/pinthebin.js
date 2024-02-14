import express from "express";
import {getbin, getbinbyid, searchbin} from "../controllers/pinthebin/getbin.js";
import {addbin} from "../controllers/pinthebin/addbin.js";
import {updatebin} from "../controllers/pinthebin/updatebin.js";


const router = express.Router();

router.get("", (req, res) => {
    res.send("test in pinthebin")
})

router.get("/bin",getbin )

router.get("/bin/:id",getbinbyid)



router.get("/bin/search",searchbin)
//add bin_info
router.post("/bin", addbin);
//update bin_info
router.put("/bin", updatebin);

// delete bin_info
router.delete("/bin/:id", async (req, res) => {});
//show bin report
router.get("/report",async (req,res)=>{});

router.post("/report",async (req,res)=>{}); //add report

// last 3 is app report is portal app report






export default router;