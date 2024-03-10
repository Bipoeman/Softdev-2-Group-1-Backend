import supabase from "../database/database.js";
import bcrypt from "bcryptjs";
import {generateRandomOTP} from "../user/sendotp.js";

export const resetpassword = async (req, res) => {
    const {email, otp, password} = req.body;
    const {data: datauser, error} = await supabase.from("user_info").select("otp").eq("email", email);
    if (error) {
        res.status(500).json({msg: error.message})
    } else if (datauser.length === 0) {
        res.status(404).json({msg: "email not found"})
    } else {
        const validotp = await bcrypt.compare(otp,datauser[0].otp);
        if (validotp) {
            const hashedpassword = bcrypt.hashSync(password, 8);
            let {data , error} = await supabase.from("user_info").update({password: hashedpassword}).eq("email", email);
            if (error) {
                res.status(500).json({msg: error.message})
            } else {
                res.status(200).json({msg: "Password updated successfully"})
            }
        }
        else {
            res.status(400).json({msg: "Invalid OTP"})
        }

        const hashedotp = bcrypt.hashSync(generateRandomOTP(6), 8);
        const {data, error} = await supabase.from("user_info").update({otp: hashedotp})
            .eq("id", datauser[0].id).select();
        if (error) {
            res.status(500).send(error)}
        else {
            res.status(200).json( {message: "otp updated successfully"})
        }
    }
}