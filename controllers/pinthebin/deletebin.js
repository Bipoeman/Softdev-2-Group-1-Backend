import supabase from "../database/database.js";

export const deletebin = async (req, res) => {
  const binId = req.params.id;
  const { data, error } = await supabase
    .from("bin_info")
    .select("picture")
    .eq("id", binId);
  if (error) res.status(500).send(error);
  else if (data.length != 0) {
    const { data, error } = await supabase.storage
      .from("bin")
      .remove(["bin_" + binId]);
    if (error) res.status(500).send(error);
    else {
      const { data, error } = await supabase
        .from("bin_info")
        .delete()
        .eq("id", binId);
      if (error) throw error;
      else {
        res.send(data);
      }
    }
  } else {
    const { data, error } = await supabase
      .from("bin_info")
      .delete()
      .eq("id", binId);
    if (error) res.status(500).send(error);
    else {
      res.send(data);
    }
  }
};
