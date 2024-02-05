import multer from "multer";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/pinthebin/' );
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
})
const uploadpinthebin = multer({storage});

export default uploadpinthebin;