const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema({
    users: [{ type: String, required: true }],
});

const Conversation = mongoose.model('Conversation', conversationSchema);

module.exports = Conversation;
