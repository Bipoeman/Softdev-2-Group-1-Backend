import supabase from "../database/database.js";
import bcrypt from "bcryptjs";

export const resetpassword = async (req, res) => {
    const {email, otp, password} = req.body;
    const {data: datauser, error} = await supabase.from("user_info").select("otp, otp_created_at").eq("email", email);
    if (error) {
        res.status(500).json({msg: error.message})
    } else if (datauser.length === 0) {
        res.status(404).json({msg: "email not found"})
    } else {
        const otpcreatedat = new Date(datauser[0].otp_created_at);
        const currenttime = new Date();
        const validotp = await bcrypt.compare(otp, datauser[0].otp);
        if (validotp && (currenttime - otpcreatedat) < 10 * 60 * 1000) {
            const hashedpassword = bcrypt.hashSync(password, 8);
            let {data , error} = await supabase.from("user_info").update({password: hashedpassword}).eq("email", email);
            if (error) {
            res.status(500).json({msg: error.message})
            } else {
            res.status(200).json({msg: "Password updated successfully"})
            }
        }
        else if (!validotp) {
            res.status(400).json({msg: "Invalid OTP"})
        } else {
            res.status(400).json({msg: "OTP expired"})
        }
        const {data, error} = await supabase.from("user_info").update({otp: null, otp_created_at: null})
            .eq("id", datauser[0].id).select();
        if (error) {
            res.status(500).send(error)}
        else {
            res.status(200).json( {message: "otp removed successfully"})
        }
    }
}