const { User } = require("./../models/user");

var jwtDecode = require("jwt-decode");

let auth = (req, res, next) => {
  try {
    //let token = req.localStorage.jwtToken;
    const authorizationHeader = req.headers["authorization"];
    let token;

    if (authorizationHeader) {
      token = authorizationHeader.split(" ")[1];
    }
    token = jwtDecode(token);
    console.log("token", token);
    // User.findByToken(token, (err, user) => {
    //   if (err) throw err;
    //   if (!user)
    //     return res.json({
    //       isAuth: false,
    //       error: true,
    //     });

    //   req.token = token;
    //   req.user = user;
    //   next();
    // });
    req.userid = token.id;
    next();
  } catch (err) {
    return next("Authintication failed");
  }
};

module.exports = { auth };
