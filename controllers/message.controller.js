const Message = require('../models/message.model');

// add a new message to database
const addMessage = async (req, res) => {
    try {
        const message = await Message.create(req.body);
        if (message) {
            return res.status(200).json({ isSuccess: true, data: message });
        } else {
            return res.status(500).json({ isSuccess: false, message: 'Message is not sent!' });
        }
    } catch (err) {
        return res.status(500).json({ isSuccess: false, message: err.message });
    }
};

// get a specific conversation from database
const getConversation = async (req, res) => {
    const { conversationId } = req.params;
    try {
        const conversation = await Message.find({ conversationId: conversationId });

        res.status(200).json({ isSuccess: true, data: conversation });
    } catch (err) {
        return res.status(500).json({ isSuccess: false, message: err.message });
    }
};

const getLastMessage = async (req, res) => {
    const conversationId = req.params.conversationId;

    try {
        const lastConversation = await Message.findOne({ conversationId: conversationId }).sort({ createdAt: -1 });
        if (lastConversation) {
            res.status(200).json({ isSuccess: true, data: lastConversation });
        } else {
            res.status(200).json({ isSuccess: true, message: '' });
        }
    } catch (err) {
        return res.status(500).json({ isSuccess: false, message: err.message });
    }
};

const markAsRead = async (req, res) => {
    const { chatId, userId } = req.body;
    if (chatId && userId) {
        const messages = await Message.updateMany(
            { conversationId: chatId, senderId: userId, isRead: false },
            { isRead: true },
        );
        res.json(messages);
    } else {
        return res.status(500).json({ isSuccess: false, message: 'Argument is missing' });
    }
};

module.exports = { addMessage, getConversation, getLastMessage, markAsRead };
