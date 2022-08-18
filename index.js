// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/api/:date_string?", function (req, res) {
  let newDate, newUnix;
  let param = Object.values(req.params)[0];

  try {
    switch (true) {
      case /\d{4}-\d{2}-\d{2}/g.test(param):
        newDate = new Date(param);
        newUnix = newDate.getTime();
        break;
      case /\d{5,}/g.test(param):
        newDate = new Date(+param);
        newUnix = +param;
        break;
      case /\s+/g.test(param):
        newDate = new Date(param);
        newUnix = newDate.getTime();
        break;
      case param === undefined:
        newDate = new Date();
        newUnix = newDate.getTime();
        break;
      default:
        res.json({ error: "Invalid Date" });
        return;
    }
  } catch (error) {
    console.log(error);
  }

  res.json({ unix: newUnix, utc: newDate.toUTCString() });
});

var listener = app.listen(3000, function () {
  console.log("Your app is listening on port " + 3000);
});
