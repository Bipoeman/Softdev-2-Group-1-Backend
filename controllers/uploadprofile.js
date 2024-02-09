export const uploadprofilecontroller = async (req, res) => {
    const file = req.file;
    const id = decodeToken(req.headers.authorization).userId;
    const newminetype = "image/jpeg";
    const newfilename = `profile_${id}.jpeg`
    const {data,err} = await supabase.from("user_info").select("profile").eq("id",id);
    if(data[0].profile === null){
        const {data: datapicture, err} = await supabase.storage.from("profile").upload(newfilename, file.buffer,{
            contentType: newminetype
        });
        if (err) throw err;
        else{
            const url = `https://pyygounrrwlsziojzlmu.supabase.co/storage/v1/object/public/${datapicture.fullPath}`;
            const {data, err} = await supabase.from("user_info").update({profile: url}).eq("id", id).select();
            if(err) throw err;
            else{
                res.send(data);
            }
        }
    }
    else{
        const {data, err} = await supabase.storage.from("profile").update(newfilename, file.buffer,{
            contentType: newminetype
        });
        if (err) throw err;
        else {res.send(data)}
    }   
}