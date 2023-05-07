const { createError } = require("./error");

module.exports.verifyAdmin = async (req, res, next) => {
  if (req.user.isAdmin !== "admin") {
    return next(createError(403, "You are not admin!"));
  } else {
    next();
  }
};
