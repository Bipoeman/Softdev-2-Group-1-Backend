import express from "express";
import multer from "multer";


const uploadfile = multer();
const router = express.Router();


// get data of toliet
router.get("/", (req, res) => {});

// get data of toliet by admin role ??
router.get("/admin", (req, res) => {});

// create toliet
router.post("/toliet", );


// create comment for toliet
router.post("/comment", (req, res) => {
});



export default router;