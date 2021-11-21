"use strict";

const { createServer } = require("http");
const { join } = require("path");

const isProduction = process.env.NODE_ENV === "production"; 
const PORT = isProduction ? process.env.PORT : 8000;

const app = isProduction
  ? require("./app.prod")
  : require("./app.dev");

const server = createServer(app);

server.listen(...isProduction ? [ PORT ] : [ PORT, () => {
  console.log(`Server running at: 'http://localhost:${PORT}'`);
}]);