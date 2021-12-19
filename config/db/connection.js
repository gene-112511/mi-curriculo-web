"use strict";

const { join } = require("path");
const { Sequelize } = require("sequelize");

let connection = {};
if ( process.env.NODE_ENV === "production" ) {
  connection = new Sequelize(process.env.MYSQL_ADDON_URI);
} else {
  const { config: environmentConfig } = require("dotenv");
  environmentConfig({
    path: join(__dirname, "..", "..", ".env")
  });
  connection = new Sequelize(process.env.APP_URI);
}

module.exports = connection;