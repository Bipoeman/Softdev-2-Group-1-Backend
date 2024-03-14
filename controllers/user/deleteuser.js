import bcrypt from "bcryptjs";
import supabase from "../database/database.js";

export const deleteuser = async (req, res) => {
    const { emailoruser, otp, password } = req.body;
    var { data, error } = await supabase
        .from("user_info")
        .select('id, otp, password, otp_created_at')
        .or(`email.eq.${emailoruser},username.eq.${emailoruser}`);
    if (error) {
        res.status(500).json({ error: true, message: error.message });
    } else {
        if (data.length === 0) {
            res.status(400).json({ error: true, message: "user does not exist" });
        } else {
            const user = data[0];
            const validPassword = await bcrypt.compare(password, user.password);
            const validOTP = await bcrypt.compare(otp, user.otp);
            const otpcreatedat = new Date(user.otp_created_at);
            const currenttime = new Date();
            if (validPassword && validOTP && (currenttime - otpcreatedat) < 10 * 60 * 1000) {
                var {data, error} = await supabase.from("user_info")
                    .delete()
                    .eq("id", user.id);
                if (error) {
                    res.status(500).json({ error: true, message: error.message });
                } else {
                    res.status(200).json({ message: "user deleted" });
                }
            } else if (!validPassword) {
                res.status(400).json({ error: true, message: "invalid password" });
            } else if (!validOTP) {
                res.status(400).json({ error: true, message: "invalid OTP" });
            } else {
                res.status(400).json({ error: true, message: "OTP expired" });
            }
        }
    }
}