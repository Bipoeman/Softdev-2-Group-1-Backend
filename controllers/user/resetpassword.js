import supabase from "../database/database.js";

export const resetpassword = async (req, res) => {
    const { emailoruser } = req.body;
    const { data, error } = await supabase.from("user_info").select("*").or(`email.eq.${emailoruser},username.eq.${emailoruser}`);
    if (error) {res.status(500).send(error)}
    else if (data.length === 0) {
        res.status(400).json({ error: true, message: "user does not exist" });
    }
    else{
        res.send("password reset link sent to your email");
    }
};