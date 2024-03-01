import supabase from "../database/database.js";

export const getreview = async (req, res) => {
  const id = req.params.id;
  const { data, error } = await supabase
    .from("toilet_comment")
    .select("*,user_info ( username , profile )")
    .eq("id_toilet", id);
  if (error) {
    res.status(500).send(error);
  } else {
    res.send(data);
  }
};
