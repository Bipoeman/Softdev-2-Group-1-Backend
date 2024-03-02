import e from "express";
import supabase from "../database/database.js";
import { decodeToken } from "../token/token.js";
import { v4 as uuidv4 } from 'uuid';

export const addpost = async (req, res) => {
    try {
        const id_user = decodeToken(req.headers.authorization).userId;
        const { title, content, category, fullname, pathimage } = req.body;
        const file = req.file;
        const newminetype = "image/jpeg";
        const newfilename = `dekhorblog_${uuidv4()}.jpeg`;
        const { data: uploadData, error: uploadError } = await supabase.storage
            .from("dekhor")
            .upload(newfilename, file.buffer, {
                contentType: newminetype
            });

        if (uploadError) throw uploadError;

        const image_link = `https://pyygounrrwlsziojzlmu.supabase.co/storage/v1/object/public/${uploadData.fullPath}`;

        const { data: postData, error: postError } = await supabase.from("dekhor_post").insert({
            title,
            content,
            category,
            image_link,
            fullname,
            pathimage,
            id_user
        });

        if (postError) throw postError;

        res.status(200).json(postData);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const drafttopost = async (req, res) => {
    const id_user = decodeToken(req.headers.authorization).userId;
    const { title, content, category,image_link, fullname,pathimage} = req.body;
    const { data, error } = await supabase.from("dekhor_post").insert({
        title,
        content,
        category,
        image_link,
        fullname,
        pathimage,
        id_user
    });
    if (error) {
        res.status(500).json({ msg: error.message });
    } else {
        res.status(200).json(data);
    }
};

export const writeblogtest = async (req, res) => {
    const id_user = decodeToken(req.headers.authorization).userId;
    const { title, content, category, fullname} = req.body;
    const { data, error } = await supabase.from("dekhor_post").insert({
        title,
        content,
        category,
        fullname,
        id_user
    });
    if (error) {
        res.status(500).json({ msg: error.message });
    } else {
        res.status(200).json(data);
    }
};

export const editpost = async (req, res) => {

    const id_user = decodeToken(req.headers.authorization).userId;
    const { id_post } = req.params;
    const { title, content, category, fullname, pathimage } = req.body;
    const { data, error } = await supabase.from("dekhor_post").update({
        title,
        content,
        category,
        fullname,
        pathimage,
        id_user
    }).eq("id_post", id_post);
    if (error) {
        res.status(500).json({ msg: error.message });
    } else {
        res.status(200).json(data);
    }
};

export const addtitlepicture = async (req, res) => {
    const file = req.file;
    const {id_post} = req.params;
    const newminetype = "image/jpeg";
    const newfilename = `dekhor_${id_post}.jpeg`;
    const { data: datapicture, err } = await supabase.storage
      .from("dekhor")
      .upload(newfilename, file.buffer, {
        contentType: newminetype,
      });
    if (err) throw err;
    else {
      const url = `https://pyygounrrwlsziojzlmu.supabase.co/storage/v1/object/public/${datapicture.fullPath}`;
      const { data, err } = await supabase
        .from("dekhor_post")
        .update({image_link: url })
        .eq("id_post", id_post);
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(data);
      }
    }
  };

export const editdraft = async (req, res) => {
    const id_user = decodeToken(req.headers.authorization).userId;
    const { id_draft } = req.params;
    const { title, content, category, fullname, pathimage } = req.body;
    const { data, error } = await supabase.from("dekhor_draft").update({
        title,
        content,
        category,
        fullname,
        pathimage,
        id_user
    }).eq("id_draft", id_draft);
    if (error) {
        res.status(500).json({ msg: error.message });
    } else {
        res.status(200).json(data);
    }

};

export const report = async (req, res) => {
    const { id_post,id_blogger } = req.params;
    const { title, reason } = req.body;
    const { data, error } = await supabase
        .from("dekhor_report")
        .insert({
            id_post,
            title,
            reason,
            id_blogger,
        });
    if (error) {
        res.status(500).json({ msg: error.message });
    }
    else {
        res.status(200).json(data);

    }
};

export const draftpost = async (req, res) => {
    try {
        const id_user = decodeToken(req.headers.authorization).userId;
        const { title, content, category, fullname, pathimage } = req.body;
        const file = req.file;
        const newminetype = "image/jpeg";
        const newfilename = `dekhorblog_${uuidv4()}.jpeg`;
        const { data: uploadData, error: uploadError } = await supabase.storage
            .from("dekhor")
            .upload(newfilename, file.buffer, {
                contentType: newminetype
            });

        if (uploadError) throw uploadError;

        const image_link = `https://pyygounrrwlsziojzlmu.supabase.co/storage/v1/object/public/${uploadData.fullPath}`;

        const { data: postData, error: postError } = await supabase.from("dekhor_draft").insert({
            title,
            content,
            category,
            image_link,
            fullname,
            pathimage,
            id_user
        });

        if (postError) throw postError;

        res.status(200).json(postData);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};


export const updatetitlepicture = async (req, res) => {
    const file = req.file;
    const { id_post } = req.params;
    const newminetype = "image/jpeg";
    const newfilename = `dekhorblog_${uuidv4()}.jpeg`;
    let { data, error } = await supabase.from("dekhor_post").select("image_link").eq("id_post", id_post);
    if (data[0].image_link !== null || data[0].image_link.exists === true) {
        const { data: datapicture, err } = await supabase.storage.from("dekhor").upload(newfilename, file.buffer, {
            contentType: newminetype
        });
        if (err) throw err;
        else {
            const url = `https://pyygounrrwlsziojzlmu.supabase.co/storage/v1/object/public/${datapicture.fullPath}`;
            const { data: updateData, err } = await supabase.from("dekhor_post").update({ image_link: url }).eq("id_post", id_post);
            if (err) throw err;
            else {
                res.send(updateData);
            }
        }
    } else {
        res.send("No image to update");
    }
}

export const updatepicturedraft = async (req, res) => {
    const file = req.file;
    const { id_draft } = req.params;
    const newminetype = "image/jpeg";
    const newfilename = `dekhorblog_${uuidv4()}.jpeg`;
    let { data, error } = await supabase.from("dekhor_draft").select("image_link").eq("id_draft", id_draft);
    if (data[0].image_link !== null || data[0].image_link.exists === true) {
        const { data: datapicture, err } = await supabase.storage.from("dekhor").upload(newfilename, file.buffer, {
            contentType: newminetype
        });
        if (err) throw err;
        else {
            const url = `https://pyygounrrwlsziojzlmu.supabase.co/storage/v1/object/public/${datapicture.fullPath}`;
            const { data: updateData, err } = await supabase.from("dekhor_draft").update({ image_link: url }).eq("id_draft", id_draft);
            if (err) throw err;
            else {
                res.send(updateData);
            }
        }
    } else {
        res.send("No image to update");
    }
}



export const savepost = async (req, res) => {
    const id_user = decodeToken(req.headers.authorization).userId;
    const { id_post } = req.params;
    const { fullname, fullname_blogger } = req.body;
    const { data, error } = await supabase.from("dekhor_savepost").insert({ id_user, id_post, fullname, fullname_blogger })
    if (error) {
        res.status(500).json(error);
    }
    else {
        console.log(data);
        res.status(200).json(data);
    }
}

export const numsave = async (req, res) => {
    const { id_post } = req.params;
    const { save } = req.body;
    const { data, error } = await supabase.from("dekhor_post").update({ save }).eq("id_post", id_post)
    if (error) {
        res.status(500).json(error);
    }
    else {
        console.log(data);
        res.status(200).json(data);
    }
}


export const commentpost = async (req, res) => {
    const id_user = decodeToken(req.headers.authorization).userId;
    const { comment, id_post } = req.body;
    const { data, error } = await supabase.from("dekhor_comment").insert({ id_user, id_post, comment })
    if (error) {
        res.status(500).json({ msg: error.message });
    }
    else {
        res.status(200).json(data);
    }
}

export const blogger = async (req, res) => {
    const { data, error } = await supabase.from('distinct_id').select('user:profiles(id, username),image: profiles(avatar_url)');
    if (error) {
        console.error(error);
        res.status(400).json(error);
    } else {
        res.status(200).json(data);
    }
}

export const searchblog = async (req, res) => {
    const { data, error } = await supabase.from("dekhor_post").select('id_post,title, category, image_link, user:public_dekhor_post_id_user_fkey(fullname)')
    if (error) {
        console.log(error)
        res.status(400).json(error);
    }
    else {
        res.status(200).json(data);
    }
}

