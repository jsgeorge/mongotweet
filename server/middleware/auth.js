const { User } = require("./../models/user");

var jwtDecode = require("jwt-decode");

let auth = (req, res, next) => {
  try {
    //let token = req.localStorage.jwtToken;
    const authorizationHeader = req.headers["authorization"];
    let token;
    console.log("authorizationHeader", authorizationHeader);
    if (authorizationHeader) {
      token = authorizationHeader.split(" ")[1];
    }
    token = jwtDecode(token);
    console.log("token", token);

    req.userid = token.id;
    next();
  } catch (err) {
    return next("Authintication failed");
  }
};

module.exports = { auth };
