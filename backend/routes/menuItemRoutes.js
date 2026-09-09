const express = require("express");
const router = express.Router();
const {
  getFullMenu,
  getSpecialItems,
  getOfferItems,
  getItems,
  upsertMenuItem,
  deleteMenuItem,
} = require("../controllers/menuItemController");

router.get("/full", getFullMenu);
router.get("/special", getSpecialItems);
router.get("/offers", getOfferItems);

router.route("/items")
  .get(getItems)
  .post(upsertMenuItem);

router.route("/items/:id")
  .delete(deleteMenuItem);

module.exports = router;
