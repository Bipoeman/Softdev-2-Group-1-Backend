import supabase from "../database/database.js";

export const uploadtoiletcomment = async (req, res) => {
  const file = req.file;

  const allowedFileTypes = ["image/png", "image/jpeg"];
  if (!allowedFileTypes.includes(file.mimetype)) {
    return res.status(400).send("Invalid file type");
  }

  const { id } = req.body;
  const newmimetype = file.mimetype;
  const newfilename = `toilet_comment_${id}`;
  const { data, err } = await supabase.storage
    .from("restroom_comment")
    .upload(newfilename, file.buffer, {
      contentType: newmimetype,
      upsert: true,
    });
  if (err) {
    res.status(500).send(err);
  } else {
    res.send(data);
  }
};
