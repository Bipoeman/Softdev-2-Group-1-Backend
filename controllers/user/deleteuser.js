import bcrypt from "bcryptjs";
import supabase from "../database/database.js";

export const deleteuser = async (req, res) => {
    const { emailoruser, password } = req.body;
    var { data, error } = await supabase
        .from("user_info")
        .select('*')
        .or(`email.eq.${emailoruser},username.eq.${emailoruser}`);
    if (error) {
        res.status(500).json({ error: true, message: error.message });
    } else {
        if (data.length === 0) {
            res.status(400).json({ error: true, message: "user does not exist" });
        } else {
            const user = data[0];
            const validPassword = await bcrypt.compare(password, user.password);
            if (validPassword) {
                var {data, error} = await supabase.from("user_info")
                    .delete()
                    .eq("id", user.id);
                if (error) {
                    res.status(500).json({ error: true, message: error.message });
                }
                else {
                    res.status(200).json({ message: "user deleted" });
                }
            } else {
                res.status(400).json({ error: true, message: "invalid password" });
            }
        }
    }
}