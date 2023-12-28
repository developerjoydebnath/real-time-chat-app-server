const Conversation = require('../models/conversation.model');

// create or update conversation list
const createConversation = async (req, res) => {
    const { senderId, receiverId } = req.body;
    const userIds = [senderId, receiverId];

    // find if the conversation is already exist
    const conversationArray = await Conversation.aggregate([
        {
            $match: {
                users: { $all: userIds },
            },
        },
    ]);

    // validation checking
    if (conversationArray.length > 0) {
        return res.status(200).json({ isSuccess: true, data: conversationArray[0] });
    } else {
        // create a new conversation object
        const conversation = {
            users: [senderId, receiverId],
        };
        try {
            // create a new conversation
            const response = await Conversation.create(conversation);
            if (response) {
                return res.status(200).json({ isSuccess: true, data: response });
            } else {
                return res.status(500).json({ isSuccess: false, message: err.message });
            }
        } catch (err) {
            return res.status(500).json({ isSuccess: false, message: 'hello error' });
        }
    }
};

const getConversationList = async (req, res) => {
    try {
        const loggedInUserId = req.params.loggedInUserId;

        const conversations = await Conversation.aggregate([
            {
                $match: {
                    users: { $in: [loggedInUserId] },
                },
            },
        ]);

        // validation check
        if (conversations.length > 0) {
            return res.status(200).json({ isSuccess: true, data: conversations });
        } else {
            return res.status(200).json({ isSuccess: true, message: 'No conversation found!' });
        }
    } catch (err) {
        return res.status(500).json({ isSuccess: false, message: err.message });
    }
};
module.exports = { createConversation, getConversationList };
