const mongoose = require('mongoose');

const url = process.env.DB_CONNECTION_STRING;
console.log(url);

const db = async () => {
    return await mongoose
        .connect(url)
        .then(() => console.log('mongodb connection established'))
        .catch((err) => console.log('error form db' + err.message));
};

module.exports = { db };
