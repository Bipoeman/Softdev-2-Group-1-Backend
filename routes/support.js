import express from "express";
import {decodeToken} from "../controllers/token/token.js";
import supabase from "../controllers/database/database.js";

const router = express.Router();

router.get("", (req, res) => {
    res.send("support");
});

router.post("", async (req, res) => {
    const user_id = decodeToken(req.headers.authorization).userId;
    const {description, contact ,  finished = false} = req.body;
    const { data, error } = await supabase.schema("public")
        .from('support')
        .insert({
                user_id,
                description,
                contact,
                finished
            });
    if (error) {res.send(error)}
    else{
        res.send(data);
    }
})

export default router;