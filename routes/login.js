import express from "express";
import { loginController } from "../controllers/login.js";

const router = express.Router();

router.get("", (req, res) => {
    res.send("login");
});


router.get("/text",(req, res)=>{
    res.send("test login with token")
})


router.post("",loginController);




export default router;