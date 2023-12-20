const { createConversation, getConversationList } = require('../controllers/conversation.controller');

const router = require('express').Router();

router.post('/add', createConversation);
router.get('/get/:loggedInUserId', getConversationList);

module.exports = router;
