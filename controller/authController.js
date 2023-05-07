const _ = require("lodash");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../model/User");
const { createError } = require("../utils/error");

module.exports.Register = async (req, res, next) => {
  try {
    let user = {};
    user = await User.findOne({ email: req.body.email });
    if (user) return next(createError(400, "user already registered!"));

    user = new User(_.pick(req.body, ["username", "email", "password"]));

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    const result = await user.save();
    res.status(201).send({
      message: "Registration Successfully! ",
      user: _.pick(result, ["_id", "username", "email"]),
    });
  } catch (err) {
    next(err);
  }
};

module.exports.Login = async (req, res, next) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user) return next(createError(404, "User not found!"));

    let validUser = await bcrypt.compare(req.body.password, user.password);
    if (!validUser)
      return next(createError(400, "Wrong password or username!"));

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET_KEY
    );

    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .send({
        message: "Login Successfully! ",
        user: _.pick(user, ["_id", "username", "email"]),
      });
  } catch (err) {
    return next(err);
  }
};
