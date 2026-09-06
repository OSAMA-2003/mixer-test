const express = require("express");
const router = express.Router();
const {
  createReview,
  getApprovedReviews,
  getAllReviews,
  updateReviewStatus,
  deleteReview,
} = require("../controllers/reviewController");

router.post("/", createReview);
router.get("/approved", getApprovedReviews);
router.get("/all", getAllReviews);
router.patch("/:id/status", updateReviewStatus);
router.delete("/:id", deleteReview);

module.exports = router;
