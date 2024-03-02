import supabase from "../database/database.js";

export const uploadtoiletpicture = async (req, res) => {
  const file = req.file;
  const { toiletid } = req.body;
  const newminetype = "image/jpeg";
  const newfilename = `toilet_${id}.jpeg`;
  const { data, error } = await supabase
    .from("toilet_info")
    .select("picture")
    .eq("id", toiletid);
  if (error) {
    res.status(500).send(error);
  } else if (data.length === 0) {
    res.status(404).send("toilet not found");
  } else if (data[0].picture === null) {
    const { data: datapicture, error } = await supabase.storage
      .from("restroom")
      .upload(newfilename, file.buffer, {
        contentType: newminetype,
      });
    if (error) {
      res.status(500).send(error);
    } else {
      const url = `https://pyygounrrwlsziojzlmu.supabase.co/storage/v1/object/public/${datapicture.fullPath}`;
      const { data, err } = await supabase
        .from("toilet_info")
        .update({ picture: url })
        .eq("id", toiletid)
        .select();
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(data);
      }
    }
  } else {
    const { data, err } = await supabase.storage
      .from("restroom")
      .update(newfilename, file.buffer, {
        contentType: newminetype,
      });
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(data);
    }
  }
};
