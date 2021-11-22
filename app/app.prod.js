"use strict";

const express = require("express");
const { join } = require("path");

const PUBLIC_DIR = join(__dirname, "..", "public");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(PUBLIC_DIR));

app.get("/", (req, res) => {
  res.sendFile(
    join(PUBLIC_DIR, "index.html")
  );
});

app.post("/", (req, res) => {
  // console.log(resolve(process.env.PUBLIC_DIR));
  res.sendFile(
    join(PUBLIC_DIR, "thank-you.html")
  );
});

app.get("*", (req, res) => {
  res.sendFile(
    join(PUBLIC_DIR, "404.html")
  );
});

module.exports = app;