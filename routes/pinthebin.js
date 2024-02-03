import express from "express";

const router = express.Router();

router.get("",(req,res)=>{
    res.send("test in pinthebin")
})

export default router;