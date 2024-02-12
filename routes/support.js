import express from "express";

import {supportControlloer} from "../controllers/support.js";

const router = express.Router();

router.get("", (req, res) => {
    res.send("support");
});

router.post("", supportControlloer)

export default router;