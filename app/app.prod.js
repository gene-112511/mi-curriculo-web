"use strict";

const express = require("express");
const { join } = require("path");
const bodyParser = require("body-parser");
const connection = require("./../config/db/connection");
// const { config: environmentConfig } = require("dotenv");

// environmentConfig({
//   path: join(__dirname, "..", ".env")
// });

const PUBLIC_DIR = join(__dirname, "..", "public");
const app = express();


app.set("view engine", "ejs");
app.set("views", join(__dirname, "views"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(PUBLIC_DIR));

app.get("/", (req, res) => {
  res.sendFile(
    join(PUBLIC_DIR, "index.html")
  );
});

app.post("/", async (req, res) => {
  // console.log(resolve(process.env.PUBLIC_DIR));
  const {
    name,
    email,
    subject,
    message
  } = req.body;
  const { ip } = req;
  const date = new Date();
  connection.query("INSERT INTO `mensajes` (`message_content`, `message_ip`, `message_email`, `message_name`, `message_date`, `message_subject`) VALUES (?, ?, ?, ?, ?, ?);", {
    replacements: [ message, ip, email, name, date, subject ]
  });

  res.sendFile(
    join(PUBLIC_DIR, "thank-you.html")
  );
});

app.get("/mensajes", async (req, res) => {
  let [ messages ] = await connection.query("SELECT * FROM `mensajes`");
  res.render("template/mensajes", {
    messages
  });
});

app.get("*", (req, res) => {
  res.sendFile(
    join(PUBLIC_DIR, "404.html")
  );
});

module.exports = app;