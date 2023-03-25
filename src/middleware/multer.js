import multer from "multer";
import path from "path"

let storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, path.join(__dirname, '../../public', 'img'));
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage: storage });

export default upload