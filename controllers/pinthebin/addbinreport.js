import supabase from "../database/database.js";
import { decodeToken } from "../token/token.js";

export const addbinreport = async (req, res) => {
  const userId = decodeToken(req.headers.authorization).userId;
  const { description, more_info, title } = req.body;
  const { data, error } = await supabase
    .from("user_issue")
    .insert([
      {
        description,
        title,
        type: "pinthebin",
        status: "null",
        user_id: userId,
        more_info: JSON.parse(more_info),
      },
    ])
    .select();
  if (error) throw error;
  else {
    res.send(data);
  }
};

export const addpictureReportController = async (req, res) => {
  const file = req.file;
  const { id } = req.body;
  const newminetype = file.mimetype;
  const newfilename = `issue_${id}`;
  const { data: datapicture, err } = await supabase.storage
    .from("user_issue")
    .upload(newfilename, file.buffer, {
      contentType: newminetype,
      upsert: true,
    });
  if (err) throw err;
  else {
    const url = `https://pyygounrrwlsziojzlmu.supabase.co/storage/v1/object/public/${datapicture.fullPath}`;
    const { data, err } = await supabase
      .from("user_issue")
      .update({ picture: url })
      .eq("id", id);
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(data);
    }
  }
};
