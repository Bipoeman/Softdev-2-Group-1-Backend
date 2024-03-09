import supabase from "../database/database.js";
import {decodeToken} from "../token/token.js";

export const updateavatar = async (req,res) =>{
    const id = decodeToken(req.headers.authorization).userId;
    const {AccessoriesType,ClotheColor,ClotheType,
        EyebrowType
    ,EyeType ,FacialHairColor,FacialHairType ,FluttermojiStyle 
    , GraphicType,HairColor ,HatColor,MouthType ,SkinColor,TopType    } = req.body;
    const emptySVGIcon = `
    <svg xmlns="http://www.w3.org/2000/svg"  viewBox="-20 -20 80 80" width="80px" height="80px"><path fill="#dff0fe" stroke="#4788c7" stroke-miterlimit="10" d="M20,1C9.507,1,1,9.507,1,20s8.507,19,19,19s19-8.507,19-19 S30.493,1,20,1z M6,20c0-7.732,6.268-14,14-14c2.963,0,5.706,0.926,7.968,2.496L8.496,27.968C6.926,25.706,6,22.963,6,20z M20,34 c-2.963,0-5.706-0.926-7.968-2.496l19.472-19.472C33.074,14.294,34,17.037,34,20C34,27.732,27.732,34,20,34z"/></svg>
    `
    const {data,error} = await supabase.from("user_info").update({
        avatar:{
            AccessoriesType:AccessoriesType,
            ClotheColor:ClotheColor,
            ClotheType:ClotheType,
            EmptySVGIcon:emptySVGIcon,
            EyebrowType:EyebrowType,
            EyeType:EyeType,
            FacialHairColor:FacialHairColor,
            FacialHairType:FacialHairType,
            FluttermojiStyle:FluttermojiStyle,
            GraphicType:GraphicType,
            HairColor:HairColor,
            HatColor:HatColor,
            MouthType:MouthType,
            SkinColor:SkinColor,
            TopType:TopType
        }
    }).eq("id",id)
    if (error) {res.status(500).send(error)}
    else{
        res.send(data)
    }
}