import express from "express";
import multer from "multer";
import supabase from "../controllers/database/database.js";
import { writeblogtest, blogger, commentpost, savepost, numsave, addpost, drafttopost, editpost, editdraft, report, addtitlepicture, updatetitlepicture, updatepicturedraft, draftpost } from "../controllers/dekhor/adddek.js";
import { countsave, detailpost, detaildraft, posttocategory, showcomment, showsave, posttoprofile, posttodraft, searchblog, searchblogger, showsaveblogger, showreport, detailreport, posttoprofileblogger, bloggerdescription } from "../controllers/dekhor/getdek.js";
import { unsave, deletepost, deletedraft, deletereport } from "../controllers/dekhor/deldek.js";
import { getrandompost } from "../controllers/dekhor/getrandompost.js";
import {showacceptreport} from "../controllers/dekhor/showacceptreport.js";
import {showrejectreport} from "../controllers/dekhor/showrejectreport.js";
import {updatereport} from "../controllers/dekhor/updatereport.js";
import {validaccesstoken} from "../controllers/token/validaccesstoken.js";

const uploadtitlepicture = multer();

const router = express.Router();

router.post("/createpost", uploadtitlepicture.single("file"), addpost); // test success

// router.post("/writeblogtest", writeblogtest);

// router.put("/addtitlepicture/:id_post", uploadtitlepicture.single("file"), addtitlepicture);

router.post("/drafttopostblog", drafttopost);

router.post("/draftpost", uploadtitlepicture.single("file"), draftpost);

router.post("/report/:id_post/:id_blogger", report);

router.get("/posttodraft", posttodraft);

router.put("/editpost/:id_post", editpost);

router.put("/editdraft/:id_draft", editdraft);

router.put("/updatepicture/:id_post", uploadtitlepicture.single("file"), updatetitlepicture);

router.put("/updatepic/:id_draft", uploadtitlepicture.single("file"), updatepicturedraft);

router.delete("/deletepost/:id_post", deletepost); // test success

router.delete("/deletedraft/:id_draft", deletedraft);

router.delete("/deletereport/:id_report", deletereport);

router.post("/savepost/:id_post", savepost); // test success

router.get("/countsave/:id_post", countsave); // test success

router.patch("/numsave/:id_post", numsave);

router.delete("/unsave/:id_post", unsave); // test success

router.post("/commentpost", commentpost); // test success //connect

router.get("/showcomment/:id_post", showcomment); // test success

router.get("/randompost", getrandompost) //connect

router.get("/showsave", showsave); // test success // connect

router.get("/posttoprofile", posttoprofile); //test success // connect ?? image asset or network , like number

router.get("/showsaveblogger/:fullname", showsaveblogger); //connect

router.get("/showreport", showreport);

router.get("/showreport/accept", showacceptreport)

router.get("/showreport/reject", showrejectreport)

router.put("/report/update",validaccesstoken, updatereport);

router.get("/detailreport/:id_report", detailreport);

router.get("/bloggerdescription/:fullname", bloggerdescription);

router.get("/posttoprofileblogger/:fullname", posttoprofileblogger); //connect

router.get("/posttocategory/:category", posttocategory); // test success // connect

router.get("/detailpost/:id_post", detailpost); //test success 

router.get("/detaildraft/:id_draft", detaildraft);

router.post("/blogger", blogger);

router.get("/searchblog", searchblog); // test success // connect

router.get("/searchblogger", searchblogger); // connect


export default router;