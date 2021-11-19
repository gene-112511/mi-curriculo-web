"use strict";

const express = require("express");
const { join } = require("path");
const logger = require("morgan");

const PUBLIC_DIR = join(__dirname, "..", "public");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(logger("dev"));
app.use(express.static(PUBLIC_DIR));

app.get("/", (req, res) => {
  res.send("Bienvenido a mi Curriculum por: Genesis Trias");
});

app.get("*", (req, res) => {
  res.send("Error 404: Not found");
});

module.exports = app;