import express from "express";
import conn from "../controllers/database/database.js";

const router = express.Router();

router.get("", (req, res) => {
    conn.query("SELECT * FROM user", (err, result) => {
        if (err) {
            res.status(500).send(err);
        }
        else {
            res.send(result);
        }
    })
}
