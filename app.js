const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  const query = req.body.cityName;
  const apiKey = "4fc118991df4a626ff27864834b47fdf";
  const unit = "imperial";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=${unit}`;
  https.get(url, function (response) {
    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const img = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
      res.write(`<h1>The temperature in ${query} is ` + temp + "F </h1>");
      res.write(weatherDescription);
      res.write(`<img src=${img}></img>`);
      res.send();
    });
  });
});

app.listen(3000, function () {
  console.log("Server running on port 3000");
});
