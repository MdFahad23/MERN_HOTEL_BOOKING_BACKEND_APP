const HotelRouter = require("../routes/hotels");
const AuthRouter = require("../routes/auth");
const UserRouter = require("../routes/users");
const RoomRouter = require("../routes/rooms");

module.exports = (app) => {
  app.use("/api/v1/auth", AuthRouter);
  app.use("/api/v1/user", UserRouter);
  app.use("/api/v1/hotels", HotelRouter);
  app.use("/api/v1/room", RoomRouter);
};
