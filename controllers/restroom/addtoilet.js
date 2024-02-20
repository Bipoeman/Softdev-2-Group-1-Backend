import supabase from "../database/database.js";

export const addtoilet = async (req, res) => {
  const { name, address, latitude, longitude, type } = req.body;
  const { data, error } = await supabase
    .from("toilet_info")
    .select("*")
    .eq("latitude", latitude)
    .eq("longitude", longitude);
  if (error) throw error;
  else {
    if (data.length === 0) {
      const { data, error } = await supabase
        .from("toilet_info")
        .insert([
          {
            name,
            address,
            latitude,
            longitude,
            type,
          },
        ])
        .select();
      if (error) throw error;
      else {
        res.send(data);
      }
    } else {
      res.send("toilet already exist");
    }
  }
};
