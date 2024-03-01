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
    let newavgstar = 0;
    for (let i = 0; i < data.length; i++) {
      newavgstar = (data[i].star + newavgstar * i) / (i + 1);
    }
    res.send({ data, newavgstar });
  }
};
