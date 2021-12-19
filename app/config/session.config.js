"use strict";

const { join } = require("path");
const { config: environmentConfig } = require("dotenv");
const session = require("express-session");
const MySQLSession = require("express-mysql-session");

environmentConfig({
  path: join(__dirname, "..", "..", ".env")
});

let sessionConfig = session({
  secret: process.env.APP_SECRET_KEY,
  resave: true,
  saveUninitialized: false,
  cookie: {
    secure: true,
    maxAge: 1000 /* ms */ * 60 /* secs */ * 60 /* mins */ * 12 /* hrs */
  },
  store: new MySQLSession({
    host: process.env.APP_HOST,
    port: process.env.APP_PORT,
    user: process.env.APP_USER,
    password: process.env.APP_PASS,
    database: process.env.APP_DDBB
  })
});

module.exports = sessionConfig;