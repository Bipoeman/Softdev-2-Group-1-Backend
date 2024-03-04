import { decodeToken } from "../token/token.js";
import supabase from "../database/database.js";

export const deletetoilet = async (req, res) => {
  const userId = decodeToken(req.headers.authorization).userId;
  const id = req.params.id;

  const { _, err, count } = await supabase
    .from("toilet_info")
    .select("*", { count: "exact" })
    .eq("user_id", userId)
    .eq("id", id);
  if (err) {
    return res.status(500).send(err);
  } else if (count === 0) {
    return res.status(403).send("You are not authorized to delete this toilet");
  }

  const { data, error } = await supabase
    .from("toilet_info")
    .delete()
    .eq("id", id);
  if (error) res.status(500).send(error);
  else {
    res.send(data);
  }
};
