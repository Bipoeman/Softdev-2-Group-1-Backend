import supabase from "../database/database.js";

export const getrandompost = async (req,res) => {
    const { data, error } = await supabase
        .from('updaterandom') // Replace with your table name
        .select('id_post,title,category,user:profiles!Create_Post_id_fkey(username),image_link')
        // .order('random()') // This orders the rows randomly
        .limit(6); // Adjust the limit as needed
    if (error) {res.status(500).send(error)}
    else {
        res.status(200).json(data);
        // console.log('Random rows:', data);
        // Do something with the random rows
    }
}