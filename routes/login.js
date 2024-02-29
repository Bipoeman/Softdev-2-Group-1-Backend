import express from "express";
import { loginController } from "../controllers/user/login.js";
import supabase from "../controllers/database/database.js";

const router = express.Router();

router.get("", (req, res) => {
    res.send("login");
});


router.get("/text",(req, res)=>{
    res.send("test login with token")
})


router.post("",loginController);

router.get("/playground", async (req, res) => {
    const {data, error} = await supabase.storage.listBuckets();
    if (error) {
        res.status(500).send(error);}
    else {
        res.status(200).send(data);
    }

});


export default router;