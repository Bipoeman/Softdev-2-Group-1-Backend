

export const gettoilet = async (req, res) => {
    const {data, error} = await supabase.from("toliet_info").select("*");
    if (error) throw error;
    else{
        res.send(data);
    }
}