const router = require("express").Router();

const {
  updateUser,
  deleteUser,
  getUser,
  getUsers,
} = require("../controller/userController");
const { verifyAdmin } = require("../utils/verifyAdmin");
const { verifyToken } = require("../utils/verifyToken");

router
  .route("/:id")
  .put(verifyToken, verifyAdmin, updateUser)
  .delete(verifyToken, verifyAdmin, deleteUser)
  .get(verifyToken, verifyAdmin, getUser);

router.route("/").get(verifyToken, verifyAdmin, getUsers);

module.exports = router;
