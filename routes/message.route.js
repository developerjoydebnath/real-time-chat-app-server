const {
    addMessage,
    getConversation,
    getLastMessage,
    markAsRead,
    uploadFile,
} = require('../controllers/message.controller');
const path = require('path');

const router = require('express').Router();

const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log(file.originalname);
        cb(null, path.join(__dirname, '../public/images'));
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    },
});

const upload = multer({ storage });

router.post('/add', addMessage);
router.get('/get/:conversationId', getConversation);
router.get('/lastMessage/:conversationId', getLastMessage);
router.put('/update/status', markAsRead);
router.post('/file-upload', upload.single('file'), uploadFile);

module.exports = router;
