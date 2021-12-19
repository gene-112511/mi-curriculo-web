"use strict";

const passportConfig = require("passport")
const { Strategy: localStrategy } = require("passport-local");
const bcryptjs = require("bcryptjs");
const connection = require("./../../config/db/connection");

passportConfig.use(
  "login",
  new localStrategy({
    usernameField: "username",
    passwordField: "password"
  },
  async ( username, password, done ) => {
    
    let [ row ] = await connection.query("SELECT * FROM `usuarios` WHERE username = ? OR email = ?", {
      replacements: [ username, username ]
    });

    let [ user ] = row.length > 0 ? row : [ null ]; 

    if ( user ) {
      // console.log("User '"+ user.username +"' found!!!");
      if ( bcryptjs.compareSync( password, user.password ) ) {
        // console.log("User '"+ user.username +"' authenticated!!!");
        return done(null, user/*, { type: "success", message: "Bienvenida " + user.first_name }*/);
      } else {
        return done(null, false/*, { type: "error", message: "Error: nombre de usuario o contraseña incorrectos", redirect: false }*/);
      }
    } 
    
    return done(true, false/*, { type: "error", message: "Error: nombre de usuario o contraseña incorrectos", redirect: false }*/);
  })
);


passportConfig.serializeUser((user, done) => {
  return done(null, user.ID);
});

passportConfig.deserializeUser(async (id, done) => {
  const [ row ] = await connection.query("SELECT * FROM `usuarios` WHERE ID = ?", {
    replacements: [ id ]
  });
  let [ user ] = row;
  done(null, user);
});

module.exports = passportConfig;