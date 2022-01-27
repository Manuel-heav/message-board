const db = require("./connection");

const messages = db.get("messages");

const getAll = () => {
    return messages.find();
}

module.exports = {
    getAll
};