const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");
const ExpressError = require("../expressError");

function authenticateJWT(req, res, next) {
  try {
    const payload = jwt.verify(req.body._token, SECRET_KEY);
    req.user = payload;
    return next();
  } catch (e) {
    return next();
  }
}

function ensureLoggedIn(req, res, next) {
  if (!req.user) {
    const e = new ExpressError("Unauthorized", 401);
    return next(e);
  } else {
    return next();
  }
}
function ensureCorrectUser(req, res, next) {
  try {
    if (req.user.username === req.params.username) {
      return next();
    } else {
      return next({ status: 401, message: "Unauthorized" });
    }
  } catch (err) {
    // errors would happen here if we made a request and req.user is undefined
    return next({ status: 401, message: "Unauthorized" });
  }
}
module.exports = { authenticateJWT, ensureLoggedIn, ensureCorrectUser };
