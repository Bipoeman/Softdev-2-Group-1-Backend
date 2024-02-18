import supabase from "../database/database.js";

export const getreview = async (req, res) => {
  const { name } = req.body;
  const { data, error } = await supabase
    .from("toilet_comment")
    .select("*")
    .eq("name_toilet", name);
  if (error) throw error;
  else {
    let newavgstar = 0;
    for (let i = 0; i < data.length; i++) {
      newavgstar = (data[i].star + newavgstar * i) / (i + 1);
    }
    res.send({ data, newavgstar });
  }
};
