console.log("********* Starting Express Server **********");

const cmd = require('node-cmd');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express();
var corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
}

app.use(cors(corsOptions))
app.use(bodyParser.json());

app.route('/online-cmd').post((request, response) => {
    cmd.get(
        request.body.query,
        (err, data, stderr) => {
            response.status(200).send({
                success: err === null && stderr === "",
                output: err === null && stderr === "" ? data : stderr,
            })
        }
    );
});

app.listen(8000, () => {
    console.log("Server Started...!");
});