const express = require("express");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");

const weatherstackKey = "27cd500b06b217ba4f4f0eef3bc77aaf";

app.set("view engine", "pug");
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index", { temperature: "" });
});

app.post("/submit", async (req, res) => {
  try {
    const location = req.body.location;
    const response = await fetch(
      `http://api.weatherstack.com/current?access_key=27cd500b06b217ba4f4f0eef3bc77aaf&query=${location}`
    );
    const data = await response.json();
    const temperature = `the current temperature in ${location} is ${data.current.temperature} °C`;
    res.render("index", { temperature });
  } catch (error) {
    console.log(error);
  }
});

app.listen(3000, () => {
  console.log("app listening on port 3000");
});
