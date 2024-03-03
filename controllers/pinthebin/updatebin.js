import { decodeToken } from "../token/token.js";
import supabase from "../database/database.js";

export const updatebin = async (req, res) => {
  const user_id = decodeToken(req.headers.authorization).userId;
  const {
    location,
    description = null,
    bintype,
    latitude,
    longitude,
  } = req.body;
  const { data, error } = await supabase
    .from("bin_info")
    .update([
      {
        location,
        description,
        bintype: JSON.parse(bintype),
        user_update: user_id,
      },
    ])
    .eq("latitude", latitude)
    .eq("longitude", longitude)
    .select("*");
  if (error) throw error;
  else {
    res.send(data);
  }
};
