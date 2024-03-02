import supabase from "../database/database.js";

export const uploadtoiletcomment = async (req, res) => {
  const file = req.file;
  const { id } = req.body;
  const newminetype = "image/jpeg";
  const newfilename = `toilet_comment_${id}.jpeg`;
  const { data, error } = await supabase
    .from("toilet_comment")
    .select("picture")
    .eq("id", id);
  if (error) {
    res.status(500).send(error);
  } else if (data.length === 0) {
    res.status(404).send("toilet not found");
  } else if (data[0].picture === null) {
    const { data: datapicture, error } = await supabase.storage
      .from("restroom_comment")
      .upload(newfilename, file.buffer, {
        contentType: newminetype,
      });
    if (error) {
      res.status(500).send(error);
    } else {
      const url = `https://pyygounrrwlsziojzlmu.supabase.co/storage/v1/object/public/${datapicture.fullPath}`;
      const { data, err } = await supabase
        .from("toilet_comment")
        .update({ picture: url })
        .eq("id", id)
        .select();
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(data);
      }
    }
  } else {
    const { data, err } = await supabase.storage
      .from("restroom_comment")
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
