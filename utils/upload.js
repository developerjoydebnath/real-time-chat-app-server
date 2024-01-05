const multer = require('multer');
const path = require('path');

const uploader = () => {
    // define the uploader pathname
    const uploader_path = path.join(__dirname, '../public/images');
    const allowed_file_types = ['image/jpeg', 'image/jpg', 'image/png'];

    // define the storage
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, uploader_path);
        },
        filename: (req, file, cb) => {
            if (file) {
                const fileExt = path.extname(file.originalname);
                const filename = file.originalname
                    .replace(fileExt, '')
                    .toLocaleLowerCase()
                    .split(' ')
                    .join('_' + '_' + Date.now());
                cb(null, filename + fileExt);
            } else {
                cb(new Error('please enter a valid file'));
            }
        },
    });

    // upload the file
    const upload = multer({
        storage: storage,
        limits: 2000000,
        fileFilter: (req, file, cb) => {
            if (allowed_file_types.includes(file.mimetype)) {
                cb(null, true);
            } else {
                console.log('files are not allowed');
                cb(new Error('only .jpg, .png or .jpeg files are allowed!'));
            }
        },
    });

    return upload;
};

module.exports = { uploader };
