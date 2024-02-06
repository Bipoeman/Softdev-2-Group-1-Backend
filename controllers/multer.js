import multer from "multer";

const storage1 = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/profile/' );
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
})

const storage2 = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/pinthebin/' );
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
})


export const uploadprofile = multer({storage: storage1});
export const uploadpinthebin = multer({storage: storage2});
