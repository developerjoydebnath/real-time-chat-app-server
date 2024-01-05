const {
    addMessage,
    getConversation,
    getLastMessage,
    markAsRead,
    deleteMessage,
    getMedia,
} = require('../controllers/message.controller');
const { fileUploader } = require('../middlewares/fileUploader');
const { fileValidator } = require('../middlewares/fileValidator.middleware');

const router = require('express').Router();

router.post('/add', fileUploader, fileValidator, addMessage);
router.get('/get/:conversationId', getConversation);
router.get('/lastMessage/:conversationId', getLastMessage);
router.get('/media/:conversationId', getMedia);
router.put('/update/status', markAsRead);
router.put('/delete/:messageId', deleteMessage);

module.exports = router;
