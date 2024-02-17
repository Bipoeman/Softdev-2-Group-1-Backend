import supabase from "../database/database.js";

export const addcomment = async (req, res) => {
  const userId = decodeToken(req.headers.authorization).userId;
  const { star, comment, name_toilet } = req.body;
  const { data, error } = await supabase
    .from("toliet_comment")
    .insert([
      {
        star,
        comment,
        name_toilet,
        user_update: userId,
      },
    ])
    .select();
  if (error) throw error;
  else {
    res.send(data);
  }
};
