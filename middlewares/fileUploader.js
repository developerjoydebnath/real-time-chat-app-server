const { uploader } = require('../utils/upload');

const fileUploader = (req, res, next) => {
    const upload = uploader();

    // call the middleware function
    upload.any()(req, res, (err) => {
        if (req.body.file === 'undefined') {
            return res.status(500).json({ error: 'please enter a file first' });
        } else if (err) {
            return res.status(500).json({ error: 'error from uploadImage controller' });
        } else {
            next();
        }
    });
};

module.exports = { fileUploader };
