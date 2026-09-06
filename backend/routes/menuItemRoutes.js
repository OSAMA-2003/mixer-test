const express = require("express");
const router = express.Router();
const {
  getFullMenu,
  getSpecialItems,
  getItems,
  upsertMenuItem,
  deleteMenuItem,
} = require("../controllers/menuItemController");

router.get("/full", getFullMenu);
router.get("/special", getSpecialItems);

router.route("/items")
  .get(getItems)
  .post(upsertMenuItem);

router.route("/items/:id")
  .delete(deleteMenuItem);

module.exports = router;
