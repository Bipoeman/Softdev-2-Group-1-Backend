import supabase from "../database/database.js";
import { decodeToken } from "../token/token.js";

export const addbinreport = async (req, res) => {
  const userId = decodeToken(req.headers.authorization).userId;
  const { description, binId, header } = req.body;
  const { data, error } = await supabase
    .from("bin_report")
    .insert([
      {
        description,
        bin_id: binId,
        header,
        user_report: userId,
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
  const binReport = req.body.id;
  const newminetype = "image/jpeg";
  const newfilename = `bin_${binReport}.jpeg`;
  const { data: datapicture, err } = await supabase.storage
    .from("bin_report")
    .upload(newfilename, file.buffer, {
      contentType: newminetype,
    });
  if (err) throw err;
  else {
    const url = `https://pyygounrrwlsziojzlmu.supabase.co/storage/v1/object/public/${datapicture.fullPath}`;
    const { data, err } = await supabase
      .from("bin_report")
      .update({ picture: url })
      .eq("id", binReport);
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(data);
    }
  }
};
