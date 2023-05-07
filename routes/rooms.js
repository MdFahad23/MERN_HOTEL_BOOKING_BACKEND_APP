const router = require("express").Router();

const {
  createRoom,
  updateRoomAvailability,
  updateRoom,
  deleteRoom,
  getRoom,
  getRooms,
} = require("../controller/roomController");
const { verifyToken } = require("../utils/verifyToken");
const { verifyAdmin } = require("../utils/verifyAdmin");

// CREATE
router.route("/:hotelId").post(verifyToken, verifyAdmin, createRoom);

// UPDATE
router.route("/availability/:id").put(updateRoomAvailability);
router.route("/:id").put(verifyToken, verifyAdmin, updateRoom);

// DELETE
router.route("/:id/:hotelId").delete(verifyToken, verifyAdmin, deleteRoom);

// GET ROOM
router.route("/:id").get(getRoom);
router.route("/").get(getRooms);

module.exports = router;
