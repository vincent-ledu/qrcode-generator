const express = require('express')
const { check, validationResult } = require('express-validator');
const app = express()
const QRCode = require('qrcode')
const bodyParser = require('body-parser');

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(express.json());

app.get('/', function (req, res) {
    res.send('up')
})

app.post('/wifi', (req, res) => {
    let ssid = req.body.ssid;
    let security = req.body.security; // WPA
    let pwd = req.body.pwd;
    console.log('req.body.hidden: ' + req.body.hidden)
    let hidden = (req.body.hidden.toLowerCase() == "true")
    console.log("ssid: " + ssid);
    console.log("security: " + security);
    console.log("hidden: " + hidden);
    let qrstring = 'WIFI:T:'+security+';S:'+ssid+';P:'+pwd+';';
    if (hidden) {
      qrstring += "H:true;";
    }
    console.log("typeof hiddend: " + typeof hidden)
    qrstring += ";";
    console.log("qrstring: " + qrstring);
    // WIFI:T:WPA;S:Salon;P:test;;
    QRCode.toDataURL(qrstring, function (err, url) {
        res.send('<img src="'+url+'">');
    })
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
