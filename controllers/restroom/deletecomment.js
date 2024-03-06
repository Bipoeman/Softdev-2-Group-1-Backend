import supabase from "../database/database.js";

export const deletecomment = async (req, res) => {
  const id = req.params.id;
  const { data, error } = await supabase
    .from("toilet_comment")
    .delete()
    .eq("id", id);
  if (error) res.status(500).send(error);
  else {
    res.send(data);
  }
};
