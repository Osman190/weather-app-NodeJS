const bodyParser = require("body-parser");
const request = require("request");
const express = require("express");
const app = express();

const apiKey = "4c30fcb7a5ccee9481a89a543064e3ad";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "pug");

app.get("/", function(req, res) {
  res.render("index", { weather: null, error: null });
});

app.post("/", function(req, res) {
  let city = req.body.city;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;

  request(url, function(err, response, body) {
    if (err) {
      res.render("index", { weather: null, error: "Error, please try again later" });
    } else {
      let weather = JSON.parse(body);
      console.log(weather);
      if (weather.main == undefined) {
        res.render("index", { weather: null, error: "Error, please try again" });
        console.log("error, please try again later");
      } else {
        let weatherText = `ìt's ${weather.main.temp} C degrees in ${weather.name}`;
        res.render("index", { weather: weatherText, error: null });
        console.log(weatherText);
      }
    }
  });
});

app.listen(3000, function() {
  console.log("Example app litening on port 3000!");
});
