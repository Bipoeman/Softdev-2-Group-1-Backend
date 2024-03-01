import supabase from "../database/database.js";

export const getavgstar = async (req, res) => {
  const { data, error } = await supabase.rpc("review");
  if (error) {
    res.status(500).send(error);
  } else {
    res.send(data);
  }
};
