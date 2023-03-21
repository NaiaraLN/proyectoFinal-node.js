const multer = require("multer");
const path = require("path")

let storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, path.join(__dirname, '../../public', 'img'));
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage: storage });

module.exports = upload