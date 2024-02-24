import supabase from "../database/database.js";

export const gettoilet = async (req, res) => {
  const { data, error } = await supabase.from("toilet_info").select("*");
  if (error) throw error;
  else {
    res.send(data);
  }
};