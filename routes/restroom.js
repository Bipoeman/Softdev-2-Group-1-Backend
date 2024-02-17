import express from "express";
import multer from "multer";
import supabase from "../controllers/database/database.js";
import {addtoilet} from "../controllers/restroom/addtoilet.js";


const uploadfile = multer();
const router = express.Router();


// get data of toliet
router.get("/", async (req, res) => {
    const {data, error} = await supabase.from("toliet_info").select("*");
    if (error) throw error;
    else{
        res.send(data);
    }
});




// create toliet
router.post("/toliet",addtoilet);

// get star to something
router.post("/star", async (req, res) => {

})

// create comment for toliet
router.post("/comment", (req, res) => {
});


export default router;