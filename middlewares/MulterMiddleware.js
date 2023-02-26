const multer = require("multer");
const path = require("path")

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, process.env.DESTINATION)
    },
    filename: (req, file, cb) => {
        req.data = file;
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage, limits: { fileSize: 1000000, files: 1 }, fileFilter: function (req, file, callback) {
        var ext = path.extname(file.originalname);
        if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
            return callback(new Error('Only images are allowed'))
        }
        if (!file) {
            return callback(new Error("PLease add Image"))
        }
        callback(null, true)
    },
})


module.exports = upload;