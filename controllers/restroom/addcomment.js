import supabase from "../database/database.js";
import { decodeToken } from "../token/token.js";

export const addcomment = async (req, res) => {
  const userId = decodeToken(req.headers.authorization).userId;
  const { star, comment, id_toilet } = req.body;
  const { data, error } = await supabase
    .from("toilet_comment")
    .insert([
      {
        star,
        comment,
        id_toilet,
        user_id: userId,
      },
    ])
    .select()
    .single();
  if (error) {
    res.status(500).send(error);
  } else {
    res.send(data);
  }
};
