import supabase from "../database/database.js";
import { decodeToken } from "../token/token.js";

export const addcomment = async (req, res) => {
  const userId = decodeToken(req.headers.authorization).userId;
  const { star, comment, name_toilet } = req.body;
  const { data, error } = await supabase
    .from("toilet_comment")
    .insert([
      {
        star,
        comment,
        name_toilet,
        user_id: userId,
      },
    ])
    .select();
  if (error) throw error;
  else {
    res.send(data);
  }
};
