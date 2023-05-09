const router = require("express").Router();

const {
  CreateHotel,
  UpdateHotel,
  DeleteHotel,
  GetHotelById,
  GetHotel,
  countByCity,
  countByType,
  getHotelRooms,
} = require("../controller/hotelController");
const { verifyAdmin } = require("../utils/verifyAdmin");
const { verifyToken } = require("../utils/verifyToken");

router.route("/").post(verifyToken, verifyAdmin, CreateHotel);

router.route("/").get(GetHotel);

router
  .route("/:id")
  .put(verifyToken, verifyAdmin, UpdateHotel)
  .delete(verifyToken, verifyAdmin, DeleteHotel)
  .get(GetHotelById);

router.route("/countByCity").get(countByCity);
router.route("/countByType").get(countByType);
router.route("/room/:id").get(getHotelRooms);

module.exports = router;
