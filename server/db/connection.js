const monk = require("monk");

require('dotenv').config();

const db = monk(process.env.CONNECTION_URL);

module.exports = db;