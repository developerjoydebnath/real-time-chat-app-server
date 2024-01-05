const path = require('path');
const Message = require('../models/message.model');
const { unlink } = require('fs');

// add a new message to database
const addMessage = async (req, res) => {
    const messageBody = {
        ...req.body,
        image: req.files.length > 0 ? req.files[0].filename : null,
    };
    try {
        const message = await Message.create(messageBody);
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
    const { limit, page } = req.query;
    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);

    try {
        const conversation = await Message.find({ conversationId: conversationId })
            .skip(limitNumber * pageNumber)
            .sort({ createdAt: 'desc' })
            .limit(limitNumber);

        res.status(200).json({ isSuccess: true, data: conversation.reverse() });
    } catch (err) {
        return res.status(500).json({ isSuccess: false, message: err.message });
    }
};

// get all media for a specific conversation
const getMedia = async (req, res) => {
    const { conversationId } = req.params;
    try {
        const media = await Message.find({ conversationId: conversationId, image: { $ne: null } }).select(
            '_id conversationId image',
        );
        return res.status(200).json({ isSuccess: true, data: media });
    } catch (err) {
        return res.status(500).json({ isSuccess: false, message: err });
    }
};

// get last conversation from database
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

// mark all conversation as read
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

// delete a message from a conversation
const deleteMessage = async (req, res) => {
    const { messageId } = req.params;
    try {
        const message = await Message.findById(messageId);
        const updatedMessage = await Message.findByIdAndUpdate(
            messageId,
            { isDeleted: true, message: null, image: null },
            { new: true },
        );

        if (message?.image) {
            unlink(path.join(__dirname, `/../public/images/${message.image}`), (err) => console.log(err));
        }

        return res.status(200).json({ isSuccess: true, data: updatedMessage });
    } catch (err) {
        return res.status(500).json({ isSuccess: false, message: err.message });
    }
};

module.exports = { addMessage, getConversation, getLastMessage, markAsRead, deleteMessage, getMedia };
