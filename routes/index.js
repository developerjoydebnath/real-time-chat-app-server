const router = require('express').Router();
const userRouter = require('./user.route');
const messageRouter = require('./message.route');
const conversationRouter = require('./conversation.route');

router.use('/user', userRouter);
router.use('/message', messageRouter);
router.use('/conversation', conversationRouter);

module.exports = router;
