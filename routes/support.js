import express from "express";

import {supportControlloer} from "../controllers/support.js";
import {validaccesstoken} from "../controllers/token/validaccesstoken.js";

const router = express.Router();

router.get("", (req, res) => {
    res.send("support");
});

router.post("",validaccesstoken,supportControlloer)

export default router;