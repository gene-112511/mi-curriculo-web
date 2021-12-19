"use strict";

const express = require("express");
const { join, resolve } = require("path");
const bodyParser = require("body-parser");
// const flash = require("express-flash-notification");
// const sessionConfig = require("./config/session.config.js");
// const passportConfig = require("./config/passport.config.js");
// const minifyConfig = require("./config/minify.config.js");
const logger = require("morgan");
const connection = require("./../config/db/connection");
const { config: environmentConfig } = require("dotenv");

environmentConfig({
  path: join(__dirname, "..", ".env")
});

const PUBLIC_DIR = resolve(process.env.PUBLIC_DIR);
const app = express();

app.set("view engine", "ejs");
app.set("views", join(__dirname, "views"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(sessionConfig);
// app.use(passportConfig.initialize());
// app.use(passportConfig.session());
// app.use(flash(app));
app.use(logger("dev"));
app.use(express.static(PUBLIC_DIR));

app.get("/", (req, res) => {
  // console.log(resolve(process.env.PUBLIC_DIR));
  res.sendFile(
    join(PUBLIC_DIR, "index.html")
  );
});

// app.get("/admin/login", (req, res) => {
//   res.send("This is the login path");
// });

// app.post("/admin/login", (req, res, next) => {
//   var login = passportConfig.authenticate("login", (err, user, info) => {
//     if ( err ) return next(err);
//     if ( !user ) {
//         req.flash({
//           type: info.type,
//           message: info.message,
//           redirect: info.redirect
//         });
//         return res.redirect("/admin/login");
//     } else if ( user ) {
//       req.logIn(user, (err) => {
//         if ( err ) {
//           return res.send("Login Error");
//         }
//         return res.redirect("/admin/dashboard");
//       });
//     }
//   });

//   login(req, res, next);
// });

// app.get("/admin/logout", (req, res) => {
//   if ( req.isAuthenticated() ) {
//     req.logout();
//     req.flash({
//       type: "info",
//       message: "Sesión finalizada con éxito",
//       redirect: false,
//     })
//     return res.rdirect("/admin/login")
//   } else {

//   }
// });

// app.get("/admin/dashboard", (req, res) => {
//   console.log(req.user);
//   if ( req.user ) {
//     return res.send("Authenticated succesfully!!!");
//   }
//   return res.send("Error: you can't access this path");
// });

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