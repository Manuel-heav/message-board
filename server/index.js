const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const app = express();

app.use(morgan('common'));
app.use(cors());
app.use(bodyParser.json());


app.get('/', (req,res) => {
    res.json({
        message: "Hello world"
    })
})
const port = process.env.PORT || 1337;

app.listen(port, () => {
    console.log(`Listening to ${port}`);
});