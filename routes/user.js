import express, { response } from "express";
import supabase from "../controllers/database/database.js";
import { uploadprofile } from "../controllers/multer.js";


const router = express.Router();

// all that is path  url/user
router.get("", async (req, res) => {
    const {data, err} = await supabase.from("user_info").select("*");
    if (err) throw err;
    else{
        res.send(data)
    }
});


router.get("/:id", async (req, res) => {
    const {id} = req.params;
    const {data, err} = await supabase.from("user_info").select("*").eq("id", id);
    if (err) throw err;
    else{
        if(data.length === 0){
            res.status(404).send("user not found")
        }   
        else{
            res.send(data[0])
        }
    }
});

router.post("/upload",uploadprofile.single("file"),async (req, res) => {
    const file = req.file;
    const {id} = req.body;
    const newminetype = "image/jpeg";
    const newfilename = `profile_${id}.jpeg`
    if (file.size > 1048576) { // 1 MB limit
        response.status(400).send("File size too large");
      }
    else{
        const {data, err} = await supabase.storage.from("profile").upload(newfilename, file.buffer,{
            contentType: newminetype
        });
        if (err) throw err;
        else{
            res.send(data);
        }
    }
});

export default router;