import express from "express";
import { registerController } from "../controllers/user/register.js";

const router = express.Router();


router.get("", (req, res) => {
    res.send("register");
})


router.post("", registerController);

export default router;