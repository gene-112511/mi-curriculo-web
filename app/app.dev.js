"use strict";

const express = require("express");
const { join, resolve } = require("path");
const logger = require("morgan");
require("dotenv").config({ path: join(__dirname, "..", ".env") });

const PUBLIC_DIR = resolve(process.env.PUBLIC_DIR);
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(logger("dev"));
app.use(express.static(PUBLIC_DIR));

app.get("/", (req, res) => {
  // console.log(resolve(process.env.PUBLIC_DIR));
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