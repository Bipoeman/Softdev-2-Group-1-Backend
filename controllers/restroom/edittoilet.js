import supabase from "../database/database.js";

export const edittoilet = async (req, res) => {
  const { name, type, for_who, id, address } = req.body;
  const { data, error } = await supabase
    .from("toilet_info")
    .update({
      name,
      type,
      address,
      for_who: JSON.parse(for_who),
    })
    .eq("id", id);
  if (error) res.status(500).send(error);
  else {
    res.send(data);
  }
};
