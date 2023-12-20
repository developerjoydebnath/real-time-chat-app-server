const { addMessage, getConversation, getLastMessage, markAsRead } = require('../controllers/message.controller');

const router = require('express').Router();

router.post('/add', addMessage);
router.get('/get/:conversationId', getConversation);
router.get('/lastMessage/:conversationId', getLastMessage);
router.put('/update/status', markAsRead);

module.exports = router;
