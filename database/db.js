const mongoose = require('mongoose');

const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.filpgs7.mongodb.net/chat-app`;
// const url = 'mongodb://127.0.0.1/chat-app';
console.log(url);

const db = async () => {
    return await mongoose
        .connect(url)
        .then(() => console.log('mongodb connection established'))
        .catch((err) => console.log('error form db' + err.message));
};

module.exports = { db };
