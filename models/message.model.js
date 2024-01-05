const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
    {
        conversationId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        senderId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        receiverId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        message: {
            type: String,
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
        image: {
            type: String,
        },
        isRead: {
            type: Boolean,
            required: true,
        },
        sendTime: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    },
);

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
