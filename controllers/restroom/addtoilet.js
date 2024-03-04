import { decodeToken } from "../token/token.js";
import supabase from "../database/database.js";

export const addtoilet = async (req, res) => {
  const userId = decodeToken(req.headers.authorization).userId;
  const { name, address, latitude, longitude, type, for_who } = req.body;
  const { data, error } = await supabase
    .from("toilet_info")
    .select("*")
    .eq("latitude", latitude)
    .eq("longitude", longitude);
  if (error) {
    res.status(500).send(error);
  } else {
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
            for_who: JSON.parse(for_who),
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
    } else {
      res.send("toilet already exist");
    }
  }
};
