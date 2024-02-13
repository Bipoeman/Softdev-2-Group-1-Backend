import express from "express";
import {supabase} from "../supabase.js";

const router = express.Router();

router.get("", (req, res) => {
    res.send("test in pinthebin")
})

router.get("/bin", async (req, res) => {
    const {data, error} = await supabase.schema("pinthebin").from("bin_info").select("*");
    if (error) throw error;
    else {
        res.send(data)
    }
})

router.get("/bin/:id",async (req,res)=>{
    const bin_id = req.params.id;
    const {data,error} = await supabase.schema("pinthebin").from("bin_info").select("*").eq("id",bin_id);
    if (error) throw error;
    else{res.send(data)}
})



router.get("/bin/search",async (req,res)=>{})
//add bin_info
router.post("/bin", async (req, res) => {});
//update bin_info
router.put("/bin", async (req, res) => {});

// delete bin_info
router.delete("/bin/:id", async (req, res) => {});
//show bin report
router.get("/report",async (req,res)=>{});

router.post("/report",async (req,res)=>{}); //add report






export default router;