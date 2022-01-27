const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const messages = require("./db/messages")
const app = express();

app.use(morgan('common'));
app.use(cors());
app.use(bodyParser.json());


app.get('/', (req,res) => {
    res.json({
        message: "Hello world"
    })
});

app.get('/messages', (req,res) => {
    messages.getAll().then((messages) => {
        res.json(messages);
    });
});

const port = process.env.PORT || 1337;

app.listen(port, () => {
    console.log(`Listening to ${port}`);
});