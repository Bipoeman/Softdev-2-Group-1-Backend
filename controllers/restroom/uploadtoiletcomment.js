import supabase from "../database/database.js";

export const uploadtoiletcomment = async (req, res) => {
  const file = req.file;
  const { id } = req.body;
  const newminetype = "image/jpeg";
  const newfilename = `toilet_comment_${id}.jpeg`;
  const { data: datapicture, error } = await supabase.storage
    .from("restroom_comment")
    .upload(newfilename, file.buffer, {
      contentType: newminetype,
      upsert: true
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
}
