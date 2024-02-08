import express from "express";
import supabase from "../controllers/database/database.js";


const router = express.Router();

// all that is path  url/user
router.get("", async (req, res) => {
    const {data, err} = await supabase.from("user_info").select("*");
    if (err) throw err;
    else{
        res.send(data)
    }
});

export default router;