const express = require("express");
const router = express.Router();
const {
  createFeedback,
  getAllFeedback,
  toggleReadStatus,
  deleteFeedback,
} = require("../controllers/feedbackController");

router.post("/", createFeedback);
router.get("/all", getAllFeedback);
router.patch("/:id/read", toggleReadStatus);
router.delete("/:id", deleteFeedback);

module.exports = router;
